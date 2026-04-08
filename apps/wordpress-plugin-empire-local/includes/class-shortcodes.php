<?php
/**
 * Shortcodes for restricted demo content.
 *
 * @package UdosEmpireLocal
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class Udos_Empire_Local_Shortcodes {

	public static function init(): void {
		add_shortcode( 'udos_empire_restricted', array( self::class, 'render_restricted' ) );
	}

	/**
	 * Inner content only for logged-in users with Empire access capability.
	 *
	 * @param array<string, string> $atts Attributes.
	 * @param string|null           $content Shortcode inner content.
	 */
	public static function render_restricted( array $atts, ?string $content = null ): string {
		if ( ! is_user_logged_in() ) {
			$login = wp_login_url( get_permalink() );
			return '<div class="udos-empire-restricted udos-empire-restricted--anon"><p>'
				. esc_html__( 'Please log in to view this content.', 'udos-empire-local' )
				. '</p><p><a class="button" href="' . esc_url( $login ) . '">'
				. esc_html__( 'Log in', 'udos-empire-local' )
				. '</a></p></div>';
		}

		if ( ! current_user_can( 'udos_empire_access' ) ) {
			return '<div class="udos-empire-restricted udos-empire-restricted--denied"><p>'
				. esc_html__( 'Your account does not have access to this Empire view.', 'udos-empire-local' )
				. '</p></div>';
		}

		$inner = $content ? do_shortcode( $content ) : '';
		return '<div class="udos-empire-restricted udos-empire-restricted--ok">' . $inner . '</div>';
	}
}
