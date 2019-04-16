<?php
// If this file is called directly, abort.
if ( !defined( 'ABSPATH' ) ) {
    exit;
}
$plugin_name = WCPOA_PLUGIN_NAME;
$plugin_version = WCPOA_PLUGIN_VERSION;
?>
<div class="wcpoa-section-left">
    <div class="wcpoa-table-main res-cl">
        <h2><?php _e('Introduction',  'woocommerce-product-attachment') ?></h2>
        <table class="wcpoa-tableouter">
            <tbody>
                <tr>
                    <td class="fr-1"><?php _e('Product Type',  'woocommerce-product-attachment') ?></td>
                    <td class="fr-2"><?php _e('WordPress Plugin',  'woocommerce-product-attachment') ?></td>
                </tr>
                <tr>
                    <td class="fr-1"><?php _e('Product Name',  'woocommerce-product-attachment') ?></td>
                    <td class="fr-2"><?php echo esc_html($plugin_name); ?></td>
                </tr>
                <tr>
                    <td class="fr-1"><?php _e('Installed Version',  'woocommerce-product-attachment') ?></td>
                    <td class="fr-2"><?php echo esc_html($plugin_version); ?></td>
                </tr>
                <tr>
                    <td class="fr-1"><?php _e('License & Terms of use',  'woocommerce-product-attachment') ?></td>
                    <td class="fr-2"><a href="#"><?php _e('Click here',  'woocommerce-product-attachment') ?></a><?php _e(' to view license and terms of use.',  'woocommerce-product-attachment') ?></td>
                </tr>
                <tr>
                    <td class="fr-1"><?php _e('Help & Support',  'woocommerce-product-attachment') ?></td>
                    <td class="fr-2">
                        <ul class="help-support">
                            <li><a target="_blank" href="<?php echo esc_url(site_url('wp-admin/admin.php?page=woocommerce_product_attachment&tab=wcpoa-plugin-getting-started')); ?>"><?php _e('Quick Start Guide',  'woocommerce-product-attachment') ?></a></li>
                            <li><a target="_blank" href="#"><?php _e('Documentation',  'woocommerce-product-attachment') ?></a>
                            </li>
                            <li><a target="_blank" href="https://store.multidots.com/dotstore-support-panel/"><?php _e('Support Forum',  'woocommerce-product-attachment') ?></a></li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td class="fr-1"><?php _e('Localization',  'woocommerce-product-attachment') ?></td>
                    <td class="fr-2"><?php _e('English, Spanish',  'woocommerce-product-attachment') ?></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>