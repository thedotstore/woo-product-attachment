<?php
// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}
$plugin_txt_domain = WCPOA_PLUGIN_TEXT_DOMAIN;
$image_url = WCPOA_PLUGIN_URL . 'admin/images/right_click.png';
?>
<div class="dotstore_plugin_sidebar">
    <div class="dotstore_discount_voucher">
        <span class="dotstore_discount_title"><?php _e('Discount Voucher', 'woocommerce-product-attachment'); ?></span>
        <span class="dotstore-upgrade"><?php _e('Upgrade to premium now and get', 'woocommerce-product-attachment'); ?></span>
        <strong class="dotstore-OFF"><?php _e('10% OFF', 'woocommerce-product-attachment'); ?></strong>
        <span class="dotstore-with-code"><?php _e('with code', 'woocommerce-product-attachment'); ?><b><?php _e('FLAT10', 'woocommerce-product-attachment'); ?></b></span>
        <a class="dotstore-upgrade" href="<?php echo esc_url('store.multidots.com/woocommerce-product-attachment'); ?>" target="_blank"><?php _e('Upgrade Now!', 'woocommerce-product-attachment'); ?></a>
    </div>

    <div class="dotstore-important-link">
        <h2><span class="dotstore-important-link-title"><?php _e('Important link', 'woocommerce-product-attachment'); ?></span></h2>
        <div class="video-detail important-link">
            <ul>
                <li>
                    <img src="<?php echo esc_url($image_url); ?>">
                    <a target="_blank" href="<?php echo esc_url("https://www.wordpress.org/plugins/woo-product-attachment/"); ?>"><?php _e('Plugin documentation', 'woocommerce-product-attachment'); ?></a>
                </li> 
                <li>
                    <img src="<?php echo esc_url($image_url); ?>">
                    <a target="_blank" href="<?php echo esc_url("https://store.multidots.com/dotstore-support-panel"); ?>"><?php _e('Support platform', 'woocommerce-product-attachment'); ?></a>
                </li>
                <li>
                    <img src="<?php echo esc_url($image_url); ?>">
                    <a target="_blank" href="<?php echo esc_url("https://store.multidots.com/suggest-a-feature"); ?>"><?php _e('Suggest A Feature', 'woocommerce-product-attachment'); ?></a>
                </li>
                <li>
                    <img src="<?php echo esc_url($image_url); ?>">
                    <a  target="_blank" href="<?php echo esc_url("https://www.wordpress.org/plugins/woo-product-attachment/"); ?>"><?php _e('Changelog', 'woocommerce-product-attachment'); ?></a>
                </li>
            </ul>
        </div>
    </div>

    <!-- html for popular plugin !-->
    <div class="dotstore-important-link">
        <h2><span class="dotstore-important-link-title"><?php _e('OUR POPULAR PLUGINS', 'woocommerce-product-attachment'); ?></span></h2>
        <div class="video-detail important-link">
            <ul>
                <li>
                    <img class="sidebar_plugin_icone" src="<?php echo esc_url(WCPOA_PLUGIN_URL . 'admin/images/advance-flat-rate.png'); ?>">
                    <a target="_blank" href="<?php echo esc_url("https://store.multidots.com/advanced-flat-rate-shipping-method-for-woocommerce"); ?>"><?php _e('Advanced Flat Rate Shipping Method', 'woocommerce-product-attachment'); ?></a>
                </li> 
                <li>
                    <img class="sidebar_plugin_icone" src="<?php echo esc_url(WCPOA_PLUGIN_URL . 'admin/images/wc-conditional-product-fees.png'); ?>">
                    <a  target="_blank" href="<?php echo esc_url("https://store.multidots.com/woocommerce-conditional-product-fees-checkout"); ?>"><?php _e('WooCommerce Conditional Product Fees', 'woocommerce-product-attachment'); ?></a>
                </li>
                <li>
                    <img class="sidebar_plugin_icone" src="<?php echo esc_url(WCPOA_PLUGIN_URL . 'admin/images/advance-menu-manager.png'); ?>">
                    <a  target="_blank" href="<?php echo esc_url("https://store.multidots.com/advance-menu-manager-wordpress"); ?>"><?php _e('Advance Menu Manager', 'woocommerce-product-attachment'); ?></a>
                </li>
                <li>
                    <img class="sidebar_plugin_icone" src="<?php echo esc_url(WCPOA_PLUGIN_URL . 'admin/images/wc-enhanced-ecommerce-analytics-integration.png'); ?>">
                    <a target="_blank" href="<?php echo esc_url("https://store.multidots.com/woocommerce-enhanced-ecommerce-analytics-integration-with-conversion-tracking"); ?>"><?php _e('Woo Enhanced Ecommerce Analytics Integration', 'woocommerce-product-attachment'); ?></a>
                </li>
                <li>
                    <img  class="sidebar_plugin_icone" src="<?php echo esc_url(WCPOA_PLUGIN_URL . 'admin/images/advanced-product-size-charts.png'); ?>">
                    <a target="_blank" href="<?php echo esc_url("https://store.multidots.com/woocommerce-advanced-product-size-charts"); ?>"><?php _e('Advanced Product Size Charts', 'woocommerce-product-attachment'); ?></a>
                </li>
                </br>
            </ul>
        </div>
        <div class="view-button">
            <a class="view_button_dotstore" target="_blank" href="<?php echo esc_url("https://store.multidots.com/plugins"); ?>"><?php _e('VIEW ALL', 'woocommerce-product-attachment'); ?></a>
        </div>
    </div>
    <!-- html end for popular plugin !-->

    <div class="dotstore-important-link">
        <h2><span class="dotstore-important-link-title"><?php _e('OUR POPULAR THEMES', 'woocommerce-product-attachment'); ?></span></h2>
        <div class="video-detail important-link">
            <ul>
                <li><img  class="sidebar_plugin_icone" src="<?php echo esc_url(WCPOA_PLUGIN_URL . 'admin/images/appify-wp.png'); ?>">
                    <a target="_blank" href="<?php echo esc_url("https://store.multidots.com/appify-multipurpose-one-page-mobile-app-landing-page-wordpress-theme"); ?>"><?php _e('Appify – Multipurpose WordPress Theme', 'woocommerce-product-attachment'); ?></a>
                </li>
                <li><img  class="sidebar_plugin_icone" src="<?php echo esc_url(WCPOA_PLUGIN_URL . 'admin/images/brand-agency.png'); ?>">
                    <a target="_blank" href="<?php echo esc_url("https://store.multidots.com/brand-agency-one-page-wordpress-theme-for-agency"); ?>"><?php _e('Brand Agency – WordPress Theme for Agency', 'woocommerce-product-attachment'); ?></a>
                </li>
                <li><img  class="sidebar_plugin_icone" src="<?php echo esc_url(WCPOA_PLUGIN_URL . 'admin/images/meraki-wp.png'); ?>">
                    <a target="_blank" href="<?php echo esc_url("https://store.multidots.com/meraki-one-page-resume-wordpress-theme"); ?>"><?php _e('Meraki - WordPress Theme for Resume', 'woocommerce-product-attachment'); ?></a>
                </li>
                <br>
            </ul>
        </div>
        <div class="view-button">
            <a class="view_button_dotstore" target="_blank" href="<?php echo esc_url("https://store.multidots.com/themes"); ?>"><?php _e('VIEW ALL', 'woocommerce-product-attachment'); ?></a>
        </div>
    </div>

</div>
</div>
</body>
</html>