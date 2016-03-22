Package.describe({
  summary: 'Telescope custom package – use as template for your own packages',
  version: '0.1.0',
  name: 'my-custom-package'
});

Package.onUse(function (api) {

  // ---------------------------------- 1. Core dependency -----------------------------------

  api.use("telescope:core");

  // ---------------------------------- 2. Files to include ----------------------------------

  // i18n config (must come first)

  api.addFiles([
    'package-tap.i18n'
  ], ['client', 'server']);

  // client & server
  /*
  api.addFiles([
    'lib/custom_fields.js',
    'lib/template_modules.js',
    'lib/email_templates.js',
    'lib/callbacks.js'
  ], ['client', 'server']);
  */
  // client

  api.addFiles([
    'lib/client/templates/custom_footer_code.html',
    'lib/client/templates/custom_footer_code.js',
    'lib/client/stylesheets/custom.scss'
  ], ['client']);

  // server

  /*
  api.addAssets([
    'lib/server/templates/custom_emailPostItem.handlebars'
  ], ['server']);
  */

  // i18n languages (must come last)

  api.addFiles([
    'i18n/en.i18n.json',
    'i18n/zh-TW.i18n.json'
  ], ['client', 'server']);

});
