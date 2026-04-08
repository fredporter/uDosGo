<?php
/**
 * Empire contact + user-link storage (options + user meta).
 *
 * @package UdosEmpireLocal
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Udos_Empire_Local_Contact_Bridge {

	public const OPTION_CONTACTS = 'udos_empire_local_v1_contacts';
	public const OPTION_LINKS    = 'udos_empire_local_v1_links';
	public const USER_META_CONTACT = 'udos_empire_contact_id';

	public static function init(): void {
		// Reserved for future hooks; REST uses static helpers below.
	}

	/**
	 * @return array<int, array<string, mixed>>
	 */
	public static function get_contacts(): array {
		$raw = get_option( self::OPTION_CONTACTS, array() );
		return is_array( $raw ) ? $raw : array();
	}

	public static function save_contacts( array $contacts ): void {
		update_option( self::OPTION_CONTACTS, $contacts, false );
	}

	/**
	 * @return array<int, array<string, mixed>>
	 */
	public static function get_links(): array {
		$raw = get_option( self::OPTION_LINKS, array() );
		return is_array( $raw ) ? $raw : array();
	}

	public static function save_links( array $links ): void {
		update_option( self::OPTION_LINKS, $links, false );
	}

	public static function get_contact_by_id( string $id ): ?array {
		foreach ( self::get_contacts() as $row ) {
			if ( isset( $row['id'] ) && (string) $row['id'] === $id ) {
				return $row;
			}
		}
		return null;
	}

	public static function upsert_contact( array $contact ): void {
		$all   = self::get_contacts();
		$id    = isset( $contact['id'] ) ? (string) $contact['id'] : '';
		$found = false;
		foreach ( $all as $i => $row ) {
			if ( isset( $row['id'] ) && (string) $row['id'] === $id ) {
				$all[ $i ] = array_merge( $row, $contact );
				$found     = true;
				break;
			}
		}
		if ( ! $found ) {
			$all[] = $contact;
		}
		self::save_contacts( $all );
	}

	/**
	 * Seed demo contact if storage is empty.
	 */
	public static function seed_demo_contact_if_empty(): void {
		if ( count( self::get_contacts() ) > 0 ) {
			return;
		}
		$now = gmdate( 'c' );
		self::upsert_contact(
			array(
				'schemaVersion' => '1.0.0',
				'id'            => 'demo-contact-001',
				'displayName'   => 'Demo Operator',
				'createdAt'     => $now,
				'consent'       => array(
					'processing' => true,
					'marketing'  => false,
					'updatedAt'  => $now,
				),
			)
		);
	}

	public static function find_link_for_user( int $user_id ): ?array {
		foreach ( self::get_links() as $row ) {
			if ( isset( $row['wpUserId'] ) && (int) $row['wpUserId'] === $user_id && isset( $row['status'] ) && 'linked' === $row['status'] ) {
				return $row;
			}
		}
		return null;
	}

	public static function link_user_to_contact( int $user_id, string $contact_id ): array {
		$contact = self::get_contact_by_id( $contact_id );
		if ( null === $contact ) {
			return array( 'error' => 'contact_not_found' );
		}

		$now   = gmdate( 'c' );
		$links = self::get_links();
		$uid   = wp_generate_uuid4();
		$user  = get_userdata( $user_id );
		$login = $user ? (string) $user->user_login : '';

		$row = array(
			'schemaVersion' => '1.0.0',
			'id'            => $uid,
			'contactId'     => $contact_id,
			'wpUserId'      => $user_id,
			'wpLogin'       => $login,
			'status'        => 'linked',
			'createdAt'     => $now,
			'updatedAt'     => $now,
		);

		$replaced = false;
		foreach ( $links as $i => $existing ) {
			if ( isset( $existing['wpUserId'] ) && (int) $existing['wpUserId'] === $user_id ) {
				$links[ $i ] = array_merge( $existing, $row );
				$replaced    = true;
				break;
			}
		}
		if ( ! $replaced ) {
			$links[] = $row;
		}
		self::save_links( $links );
		update_user_meta( $user_id, self::USER_META_CONTACT, $contact_id );

		return array( 'link' => $row );
	}
}
