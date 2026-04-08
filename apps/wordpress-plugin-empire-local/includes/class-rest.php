<?php
/**
 * REST API for Host / ThinUI / demo operators.
 *
 * @package UdosEmpireLocal
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Udos_Empire_Local_REST {

	public static function init(): void {
		add_action( 'rest_api_init', array( self::class, 'register_routes' ) );
	}

	public static function register_routes(): void {
		register_rest_route(
			'udos-empire/v1',
			'/health',
			array(
				'methods'             => 'GET',
				'callback'            => static function () {
					return new WP_REST_Response(
						array(
							'ok'      => true,
							'service' => 'udos-empire-local',
							'version' => UDOS_EMPIRE_LOCAL_VERSION,
						),
						200
					);
				},
				'permission_callback' => '__return_true',
			)
		);

		register_rest_route(
			'udos-empire/v1',
			'/contacts',
			array(
				'methods'             => 'GET',
				'callback'            => array( self::class, 'rest_list_contacts' ),
				'permission_callback' => static function () {
					return current_user_can( 'manage_options' );
				},
			)
		);

		register_rest_route(
			'udos-empire/v1',
			'/me/contact',
			array(
				'methods'             => 'GET',
				'callback'            => array( self::class, 'rest_me_contact' ),
				'permission_callback' => array( self::class, 'rest_require_logged_in' ),
			)
		);

		register_rest_route(
			'udos-empire/v1',
			'/me/link',
			array(
				'methods'             => 'POST',
				'callback'            => array( self::class, 'rest_me_link' ),
				'permission_callback' => array( self::class, 'rest_require_logged_in' ),
			)
		);

		register_rest_route(
			'udos-empire/v1',
			'/contacts/(?P<id>[a-zA-Z0-9\-]+)',
			array(
				'methods'             => 'PATCH',
				'callback'            => array( self::class, 'rest_patch_contact' ),
				'permission_callback' => array( self::class, 'rest_can_edit_contact' ),
				'args'                => array(
					'id' => array(
						'required' => true,
						'type'     => 'string',
					),
				),
			)
		);

		register_rest_route(
			'udos-empire/v1',
			'/links',
			array(
				'methods'             => 'GET',
				'callback'            => static function () {
					return new WP_REST_Response(
						array( 'links' => Udos_Empire_Local_Contact_Bridge::get_links() ),
						200
					);
				},
				'permission_callback' => static function () {
					return current_user_can( 'manage_options' );
				},
			)
		);
	}

	public static function rest_require_logged_in(): bool {
		return is_user_logged_in();
	}

	public static function rest_list_contacts(): WP_REST_Response {
		return new WP_REST_Response(
			array( 'contacts' => Udos_Empire_Local_Contact_Bridge::get_contacts() ),
			200
		);
	}

	public static function rest_me_contact(): WP_REST_Response|\WP_Error {
		$user_id = get_current_user_id();
		$link    = Udos_Empire_Local_Contact_Bridge::find_link_for_user( $user_id );
		$cid     = (string) get_user_meta( $user_id, Udos_Empire_Local_Contact_Bridge::USER_META_CONTACT, true );
		if ( '' === $cid && $link && isset( $link['contactId'] ) ) {
			$cid = (string) $link['contactId'];
		}
		$contact = '' !== $cid ? Udos_Empire_Local_Contact_Bridge::get_contact_by_id( $cid ) : null;

		return new WP_REST_Response(
			array(
				'contact' => $contact,
				'link'    => $link,
			),
			200
		);
	}

	public static function rest_me_link( WP_REST_Request $request ): WP_REST_Response|\WP_Error {
		$params     = $request->get_json_params();
		$contact_id = '';
		if ( is_array( $params ) && isset( $params['contactId'] ) ) {
			$contact_id = (string) $params['contactId'];
		}
		if ( '' === $contact_id ) {
			return new WP_Error( 'invalid_contact', 'contactId required in JSON body', array( 'status' => 400 ) );
		}
		$user_id = get_current_user_id();
		$result  = Udos_Empire_Local_Contact_Bridge::link_user_to_contact( $user_id, $contact_id );
		if ( isset( $result['error'] ) ) {
			return new WP_Error( 'not_found', 'Contact not found', array( 'status' => 404 ) );
		}
		do_action( 'udos_empire_user_linked', $user_id, $contact_id );
		return new WP_REST_Response( $result['link'], 200 );
	}

	public static function rest_can_edit_contact( WP_REST_Request $request ): bool|\WP_Error {
		if ( ! is_user_logged_in() ) {
			return false;
		}
		$id      = (string) $request->get_param( 'id' );
		$user_id = get_current_user_id();
		if ( current_user_can( 'manage_options' ) ) {
			return true;
		}
		$link = Udos_Empire_Local_Contact_Bridge::find_link_for_user( $user_id );
		if ( $link && isset( $link['contactId'] ) && (string) $link['contactId'] === $id ) {
			return true;
		}
		$meta = (string) get_user_meta( $user_id, Udos_Empire_Local_Contact_Bridge::USER_META_CONTACT, true );
		return $meta === $id;
	}

	public static function rest_patch_contact( WP_REST_Request $request ): WP_REST_Response|\WP_Error {
		$id   = (string) $request->get_param( 'id' );
		$body = $request->get_json_params();
		if ( ! is_array( $body ) ) {
			$body = array();
		}
		$row = Udos_Empire_Local_Contact_Bridge::get_contact_by_id( $id );
		if ( null === $row ) {
			return new WP_Error( 'not_found', 'Contact not found', array( 'status' => 404 ) );
		}

		if ( isset( $body['displayName'] ) && is_string( $body['displayName'] ) ) {
			$row['displayName'] = sanitize_text_field( $body['displayName'] );
		}
		if ( isset( $body['consent'] ) && is_array( $body['consent'] ) ) {
			$consent = isset( $row['consent'] ) && is_array( $row['consent'] ) ? $row['consent'] : array();
			if ( array_key_exists( 'marketing', $body['consent'] ) ) {
				$consent['marketing'] = (bool) $body['consent']['marketing'];
			}
			if ( array_key_exists( 'processing', $body['consent'] ) ) {
				$consent['processing'] = (bool) $body['consent']['processing'];
			}
			$consent['updatedAt'] = gmdate( 'c' );
			$row['consent']       = $consent;
		}
		$row['updatedAt'] = gmdate( 'c' );
		Udos_Empire_Local_Contact_Bridge::upsert_contact( $row );

		do_action( 'udos_empire_contact_updated', $id, $row );

		return new WP_REST_Response( $row, 200 );
	}
}
