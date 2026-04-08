<?php
/**
 * Capabilities for restricted demo content.
 *
 * @package UdosEmpireLocal
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Udos_Empire_Local_Capabilities {

	public static function init(): void {
		// Runtime hooks only; activation is registered from main plugin file.
	}

	/**
	 * Grant demo capability; seed contact; create restricted demo page once.
	 */
	public static function on_activate(): void {
		self::ensure_cap_for_roles( array( 'subscriber', 'administrator' ) );
		Udos_Empire_Local_Contact_Bridge::seed_demo_contact_if_empty();
		self::ensure_demo_page();
	}

	/**
	 * @param array<int, string> $roles Role slugs.
	 */
	private static function ensure_cap_for_roles( array $roles ): void {
		foreach ( $roles as $slug ) {
			$role = get_role( $slug );
			if ( $role && ! $role->has_cap( 'udos_empire_access' ) ) {
				$role->add_cap( 'udos_empire_access' );
			}
		}
	}

	private static function ensure_demo_page(): void {
		$existing = (int) get_option( 'udos_empire_local_demo_page_id', 0 );
		if ( $existing > 0 && get_post( $existing ) instanceof WP_Post ) {
			return;
		}
		$post_id = wp_insert_post(
			array(
				'post_title'   => __( 'Empire — Local (restricted)', 'udos-empire-local' ),
				'post_name'    => 'empire-local-restricted',
				'post_status'  => 'publish',
				'post_type'    => 'page',
				'post_content' => "[udos_empire_restricted]\n<h2>" . esc_html__( 'Local Empire self-service', 'udos-empire-local' ) . "</h2>\n<p>" . esc_html__( 'If you can read this, you are logged in with Empire access.', 'udos-empire-local' ) . "</p>\n<p>" . esc_html__( 'Use the REST API or ThinUI demo to link your WP user to the seeded Empire contact.', 'udos-empire-local' ) . "</p>\n[/udos_empire_restricted]",
			),
			true
		);
		if ( is_wp_error( $post_id ) ) {
			return;
		}
		update_option( 'udos_empire_local_demo_page_id', (int) $post_id, false );
	}
}
