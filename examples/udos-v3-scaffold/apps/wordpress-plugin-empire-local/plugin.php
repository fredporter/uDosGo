<?php
/**
 * Plugin Name: uDOS Empire Local
 */
add_action('rest_api_init', function () {
  register_rest_route('udos/v1', '/ping', [
    'methods' => 'GET',
    'callback' => function () {
      return ['status' => 'ok'];
    }
  ]);
});
