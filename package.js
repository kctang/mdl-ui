Package.describe({
    name: 'kctang:mdl-ui',
    version: '0.0.1',
    //summary: '',
    git: 'https://github.com/kctang/mdl-ui',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.1');
    api.use([
        'ecmascript',
        'meteor-base'
    ]);
    api.use([
        'templating'
    ], 'client');

    api.addFiles([
        'mdl-ui.js',
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
        'page-layout/page-layout.html',
        'page-layout/page-layout.js'


    ], 'client');

/*
    api.addAssets([

    ], 'client');
*/

    api.export([
        'MdlUi'
    ], 'client');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
});
