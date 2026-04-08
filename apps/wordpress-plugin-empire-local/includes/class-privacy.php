<?php
/**
 * Privacy export / erase (registered; erase may stub).
 *
 * @package UdosEmpireLocal
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Udos_Empire_Local_Privacy {

	public static function init(): void {
		add_filter( 'wp_privacy_personal_data_exporters', array( self::class, 'register_exporter' ) );
		add_filter( 'wp_privacy_personal_data_erasers', array( self::class, 'register_eraser' ) );
	}

	/**
	 * @param array<int, array<string, mixed>> $exporters Exporters.
	 * @return array<int, array<string, mixed>>
	 */
	public static function register_exporter( array $exporters ): array {
		$exporters['udos-empire-local'] = array(
			'exporter_friendly_name' => __( 'uDOS Empire Local (demo)', 'udos-empire-local' ),
			'callback'               => array( self::class, 'export_personal_data' ),
		);
		return $exporters;
	}

	/**
	 * @param array<int, array<string, mixed>> $erasers Erasers.
	 * @return array<int, array<string, mixed>>
	 */
	public static function register_eraser( array $erasers ): array {
		$erasers['udos-empire-local'] = array(
			'eraser_friendly_name' => __( 'uDOS Empire Local (demo stub)', 'udos-empire-local' ),
			'callback'             => array( self::class, 'erase_personal_data' ),
		);
		return $erasers;
	}

	public static function export_personal_data( string $email, int $page = 1 ): array {
		$user = get_user_by( 'email', $email );
		if ( ! $user ) {
			return array(
				'data' => array(),
				'done' => true,
			);
		}
		$uid      = (int) $user->ID;
		$contact_id = (string) get_user_meta( $uid, Udos_Empire_Local_Contact_Bridge::USER_META_CONTACT, true );
		$link       = Udos_Empire_Local_Contact_Bridge::find_link_for_user( $uid );
		$out        = array();
		if ( '' !== $contact_id ) {
			$out[] = array(
				'name'  => __( 'Empire contact id', 'udos-empire-local' ),
				'value' => $contact_id,
			);
		}
		if ( $link ) {
			$out[] = array(
				'name'  => __( 'Empire user link (JSON)', 'udos-empire-local' ),
				'value' => wp_json_encode( $link ),
			);
		}

		return array(
			'data' => array(
				array(
					'group_id'          => 'udos_empire_local',
					'group_label'       => __( 'Empire Local', 'udos-empire-local' ),
					'group_description' => __( 'Demo contact bridge fields stored by the plugin.', 'udos-empire-local' ),
					'item_id'           => 'empire-local-' . $uid,
					'data'              => $out,
				),
			),
			'done' => true,
		);
	}

	public static function erase_personal_data( string $email, int $page = 1 ): array {
		$user = get_user_by( 'email', $email );
		if ( ! $user ) {
			return array(
				'items_removed'  => false,
				'items_retained'   => false,
				'messages'         => array(),
				'done'             => true,
			);
		}
		$uid = (int) $user->ID;
		delete_user_meta( $uid, Udos_Empire_Local_Contact_Bridge::USER_META_CONTACT );
		return array(
			'items_removed'  => true,
			'items_retained'   => false,
			'messages'         => array( __( 'Removed Empire contact id from user meta (demo eraser).', 'udos-empire-local' ) ),
			'done'             => true,
		);
	}
}
