Package.describe({
    name: 'kctang:mdl-ui',
    version: '0.0.1',
    summary: 'Reusable application templates/layouts (experimental)',
    git: 'https://github.com/kctang/mdl-ui',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.1');
    api.use([
        'ecmascript',
        'meteor-base',
        'aldeed:simple-schema',
        // http://stackoverflow.com/questions/32813802/meteor-exception-in-template-helper-referenceerror-match-is-not-defined
        'check'
    ]);
    api.use([
        'templating',
        'stylus'
    ], 'client');

    api.addFiles([
        'mdl-ui.js'
    ]);

    api.addFiles([
        'mdl-ui-test.js'
    ], 'client');

    api.addFiles([
        'app/app-layout.css',
        'app/app-layout.html',
        'app/app-layout.js',
        'app/app-drawer.css',
        'app/app-drawer.html',
        'app/app-drawer.js',
        'app/app-drawer-public.html',
        'app/app-drawer-public.js',

        'default-about/default-about.css',
        'default-about/default-about.html',
        'default-help/default-help.css',
        'default-help/default-help.html',
        'default-home/default-home.css',
        'default-home/default-home.html',
        'default-home/default-home.js',
        'default-settings/default-settings.css',
        'default-settings/default-settings.html',
        'default-settings/default-settings.js',

        'fab/fab.css',
        'fab/fab.html',
        'fab/fab.js',

        'form/checkbox/checkbox.html',
        'form/checkbox/checkbox.js',
        'form/checkbox/checkbox.styl',
        'form/section/section.html',
        'form/section/section.js',
        'form/section/section.styl',
        'form/select/select.html',
        'form/select/select.js',
        'form/select/select.styl',
        'form/text/text.html',
        'form/text/text.js',
        'form/textarea/textarea.html',
        'form/textarea/textarea.js',

        'form/form.html',
        'form/form.js',
        'form/form.styl',

        'head/head.html',

        'page-layout/page-layout.html',
        'page-layout/page-layout.js'
    ], 'client');

    api.addFiles('mdl-ui.styl', 'client', {isImport: true});

    /*
     api.addAssets([

     ], 'client');
     */

    api.export([
        'MdlUi'
    ]);
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
});
