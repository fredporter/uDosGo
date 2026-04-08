<?php
/**
 * Optional push to uDOS Host event log (when wp-config defines URL + token).
 *
 * @package UdosEmpireLocal
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Udos_Empire_Local_Host_Notify {

	public static function init(): void {
		add_action( 'udos_empire_user_linked', array( self::class, 'on_user_linked' ), 10, 2 );
		add_action( 'udos_empire_contact_updated', array( self::class, 'on_contact_updated' ), 10, 2 );
	}

	public static function on_user_linked( int $user_id, string $contact_id ): void {
		self::post(
			'wp.contact_linked',
			array(
				'contactId' => $contact_id,
				'wpUserId'  => $user_id,
			)
		);
	}

	/**
	 * @param array<string, mixed> $contact_row Updated contact document.
	 */
	public static function on_contact_updated( string $contact_id, array $contact_row ): void {
		self::post(
			'wp.profile_updated',
			array(
				'contactId' => $contact_id,
				'contact'   => $contact_row,
			)
		);
	}

	/**
	 * @param array<string, mixed> $payload Event payload (no secrets).
	 */
	private static function post( string $type, array $payload ): void {
		if ( ! defined( 'UDOS_EMPIRE_HOST_URL' ) || ! defined( 'UDOS_EMPIRE_BRIDGE_TOKEN' ) ) {
			return;
		}
		$base = rtrim( (string) constant( 'UDOS_EMPIRE_HOST_URL' ), '/' );
		if ( '' === $base ) {
			return;
		}
		$url   = $base . '/api/v1/bridge/wp-event';
		$token = (string) constant( 'UDOS_EMPIRE_BRIDGE_TOKEN' );
		if ( '' === $token ) {
			return;
		}

		$body = wp_json_encode(
			array(
				'type'    => $type,
				'payload' => $payload,
			)
		);

		wp_remote_post(
			$url,
			array(
				'timeout'  => 3,
				'blocking' => false,
				'headers'  => array(
					'Content-Type'         => 'application/json',
					'X-Udos-Bridge-Token' => $token,
				),
				'body'     => $body,
			)
		);
	}
}
