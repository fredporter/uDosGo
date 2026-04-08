<?php
/**
 * Plugin Name:       uDOS Empire Local
 * Description:       Local Empire contact bridge, REST hooks, privacy exporters, and restricted-page helpers for uDOS v3.0.1 demo.
 * Version:           0.2.1
 * Author:            uDOS
 * Text Domain:       udos-empire-local
 *
 * @package UdosEmpireLocal
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'UDOS_EMPIRE_LOCAL_VERSION', '0.2.1' );
define( 'UDOS_EMPIRE_LOCAL_FILE', __FILE__ );

require_once __DIR__ . '/includes/class-rest.php';
require_once __DIR__ . '/includes/class-contact-bridge.php';
require_once __DIR__ . '/includes/class-privacy.php';
require_once __DIR__ . '/includes/class-capabilities.php';
require_once __DIR__ . '/includes/class-shortcodes.php';
require_once __DIR__ . '/includes/class-host-notify.php';

register_activation_hook( __FILE__, array( 'Udos_Empire_Local_Capabilities', 'on_activate' ) );

add_action(
	'plugins_loaded',
	static function () {
		Udos_Empire_Local_Capabilities::init();
		Udos_Empire_Local_REST::init();
		Udos_Empire_Local_Contact_Bridge::init();
		Udos_Empire_Local_Privacy::init();
		Udos_Empire_Local_Shortcodes::init();
		Udos_Empire_Local_Host_Notify::init();
	}
);
