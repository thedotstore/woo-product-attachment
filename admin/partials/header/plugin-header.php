<?php
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// If this file is called directly, abort.
if ( !defined( 'ABSPATH' ) ) {
    exit;
}
$plugin_url = WCPOA_PLUGIN_URL;
$plugin_name = WCPOA_PLUGIN_NAME;
$plugin_text_domain = WCPOA_PLUGIN_TEXT_DOMAIN;
?>

<div id="dotsstoremain">
    <div class="all-pad">
        <header class="dots-header">
            <div class="dots-logo-main">
                <img src="<?php echo esc_url($plugin_url . '/admin/images/woo-product-att-logo.png'); ?>">
            </div>
            <div class="dots-header-right">
                <div class="logo-detail">
                    <strong><?php echo wp_kses_post($plugin_name); ?></strong>
                    <span><?php _e('Free Version'); ?> <?php echo esc_html(WCPOA_PLUGIN_VERSION) ?></span>
                </div>

                <div class="button-dots">
                    <span class="upgrade_pro_image">
                        <a target="_blank" href="<?php echo esc_url('store.multidots.com/woocommerce-product-attachment'); ?>">
                            <img src="<?php echo esc_url($plugin_url . 'admin/images/upgrade_new.png'); ?>">
                        </a>
                    </span>
                    <span class="support_dotstore_image">
                        <a target="_blank" href="<?php echo esc_url('store.multidots.com/dotstore-support-panel'); ?>" >
                            <img src="<?php echo esc_url($plugin_url . 'admin/images/support_new.png'); ?>">
                        </a>
                    </span>
                </div>
            </div>
            <?php
            $about_plugin_setting_menu_enable = '';
            $about_plugin_get_started = '';
            $about_plugin_quick_info = '';
            $dotstore_setting_menu_enable = '';
            $wcpoa_plugin_setting_page = '';
            $wcpoa_pro_details = '';

            if (!empty($_GET['tab']) && $_GET['tab'] == 'wcpoa_plugin_setting_page') {
                $wcpoa_plugin_setting_page = "acitve";
            }
            if (empty($_GET['tab']) && $_GET['page'] == 'woocommerce_product_attachment') {
                $wcpoa_plugin_setting_page = "acitve";
            }
            if (!empty($_GET['tab']) && $_GET['tab'] == 'wcpoa-pro-details-page') {
                $wcpoa_pro_details = "acitve";
            }
            if (!empty($_GET['tab']) && $_GET['tab'] == 'wcpoa-plugin-getting-started') {
                $about_plugin_setting_menu_enable = "acitve";
                $about_plugin_get_started = "acitve";
            }
            if (!empty($_GET['tab']) && $_GET['tab'] == 'wcpoa-plugin-quick-info') {
                $about_plugin_setting_menu_enable = "acitve";
                $about_plugin_quick_info = "acitve";
            }
            ?>

            <div class="dots-menu-main">
                <nav>
                    <ul>
                        <li><a class="dotstore_plugin <?php echo esc_attr($wcpoa_plugin_setting_page); ?>" href="<?php echo esc_url(site_url('wp-admin/admin.php?page=woocommerce_product_attachment&tab=wcpoa_plugin_setting_page')); ?>"><?php _e('Settings', 'woocommerce-product-attachment') ?></a></li>
                        <li>
                            <a class="dotstore_plugin <?php echo esc_attr($about_plugin_setting_menu_enable); ?>" href="<?php echo esc_url(site_url('wp-admin/admin.php?page=woocommerce_product_attachment&tab=wcpoa-plugin-getting-started')); ?>"><?php _e('About Plugin', 'woocommerce-product-attachment') ?></a>
                            <ul class="sub-menu">
                                <li>
                                    <a class="dotstore_plugin <?php echo esc_attr($about_plugin_get_started); ?>" href="<?php echo esc_url(site_url('wp-admin/admin.php?page=woocommerce_product_attachment&tab=wcpoa-plugin-getting-started')); ?>"><?php _e('Getting Started', 'woocommerce-product-attachment') ?></a>
                                </li>
                                <li>
                                    <a class="dotstore_plugin <?php echo esc_attr($about_plugin_quick_info); ?>" href="<?php echo esc_url(site_url('wp-admin/admin.php?page=woocommerce_product_attachment&tab=wcpoa-plugin-quick-info')); ?>"><?php _e('Introduction', 'woocommerce-product-attachment') ?></a>
                                </li>
                                <li><a target="_blank" href="<?php esc_url("https://store.multidots.com/suggest-a-feature/"); ?>"><?php _e('Suggest A Feature', 'woocommerce-product-attachment'); ?></a></li>
                            </ul>
                        </li>
                        <li><a class="dotstore_plugin <?php echo esc_attr($wcpoa_pro_details); ?>" href="<?php echo esc_url(site_url('wp-admin/admin.php?page=woocommerce_product_attachment&tab=wcpoa-pro-details-page')); ?>"><?php _e('Premium Version', 'woocommerce-product-attachment') ?></a></li>
                        <li>
                            <a class="dotstore_plugin <?php echo esc_attr($dotstore_setting_menu_enable); ?>" href="#"><?php _e('Dotstore', 'woocommerce-product-attachment'); ?></a>
                            <ul class="sub-menu">
                                <li><a target="_blank" href="<?php esc_url("https://store.multidots.com/go/flatrate-pro-new-interface-woo-plugins"); ?>"><?php _e('WooCommerce Plugins', 'woocommerce-product-attachment'); ?></a></li>
                                <li><a target="_blank" href="<?php esc_url("https://store.multidots.com/go/flatrate-pro-new-interface-wp-plugins"); ?>"><?php _e('Wordpress Plugins', 'woocommerce-product-attachment'); ?></a></li><br>
                                <li><a target="_blank" href="<?php esc_url("https://store.multidots.com/go/flatrate-pro-new-interface-wp-free-plugins"); ?>"><?php _e('Free Plugins', 'woocommerce-product-attachment'); ?></a></li>
                                <li><a target="_blank" href="<?php esc_url("https://store.multidots.com/go/flatrate-pro-new-interface-free-theme"); ?>"><?php _e('Free Themes', 'woocommerce-product-attachment'); ?></a></li>
                                <li><a target="_blank" href="<?php esc_url("https://store.multidots.com/go/flatrate-pro-new-interface-dotstore-support"); ?>"><?php _e('Contact Support', 'woocommerce-product-attachment'); ?></a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>