<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://www.thedotstore.com/
 * @since             1.0.0
 * @package           Woocommerce_Product_Attachment
 *
 * @wordpress-plugin
 * Plugin Name:       WooCommerce Product Attachment
 * Plugin URI:        https://www.thedotstore.com/
 * Description:       WooCommerce Product Attachment Plugin will help you to attach/ upload any kind of files for a customer orders.You can attach any type of file like Images, documents, videos and many more..
 * Version:           1.1.8
 * Author:            Thedotstore
 * Author URI:        https://www.thedotstore.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       woocommerce-product-attachment
 * Domain Path:       /languages
 */
// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}
if (!defined('WCPOA_PLUGIN_URL')) {
    define('WCPOA_PLUGIN_URL', plugin_dir_url(__FILE__));
}
if (!defined('WCPOA_PLUGIN_VERSION')) {
    define('WCPOA_PLUGIN_VERSION', '1.1.8');
}
if (!defined('WCPOA_META_PREFIX')) {
    define('WCPOA_META_PREFIX', '_WCPOA_');
}
if (!defined('WCPOA_PLUGIN_BASENAME')) {
    define('WCPOA_PLUGIN_BASENAME', plugin_basename(__FILE__));
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-woocommerce-product-attachment-activator.php
 */
function activate_woocommerce_product_attachment() {
    require_once plugin_dir_path(__FILE__) . 'includes/class-woocommerce-product-attachment-activator.php';
    Woocommerce_Product_Attachment_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-woocommerce-product-attachment-deactivator.php
 */
function deactivate_woocommerce_product_attachment() {
    require_once plugin_dir_path(__FILE__) . 'includes/class-woocommerce-product-attachment-deactivator.php';
    Woocommerce_Product_Attachment_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_woocommerce_product_attachment');
register_deactivation_hook(__FILE__, 'deactivate_woocommerce_product_attachment');


/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-woocommerce-product-attachment.php';

/**
 * Define all constants
 */
require plugin_dir_path(__FILE__) . 'includes/class-woocommerce-product-attachment-constants.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_woocommerce_product_attachment() {

    $plugin = new Woocommerce_Product_Attachment();
    $plugin->run();
}
run_woocommerce_product_attachment();