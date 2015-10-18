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
        'check',
        'momentjs:moment'
    ]);
    api.use([
        'templating',
        'stylus',
        'fermuch:pickadate'
    ], 'client');

    api.addFiles([
        'mdl-ui.js'
    ]);

    api.addFiles([
        'mdl-ui-test.js'
    ], 'client');

    // demos
    api.addFiles([
        'demos/about/about-demo.html',
        'demos/about/about-demo.styl',
        'demos/help/default-help.html',
        'demos/help/help-demo.styl',
        'demos/home/home-demo.html',
        'demos/home/home-demo.js',
        'demos/home/home-demo.styl',
        'demos/settings/settings-demo.html',
        'demos/settings/settings-demo.js',
        'demos/settings/settings-demo.styl'
    ], 'client');

    api.addFiles([
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

        'head/head.html'
    ], 'client');

    // layouts
    api.addFiles([
        'layouts/app/app-drawer.html',
        'layouts/app/app-drawer.js',
        'layouts/app/app-drawer.styl',
        'layouts/app/app-drawer-public.html',
        'layouts/app/app-drawer-public.js',
        'layouts/app/app-layout.html',
        'layouts/app/app-layout.js',
        'layouts/app/app-layout.styl',
        'layouts/page/page-layout.html',
        'layouts/page/page-layout.js'
    ], 'client');

    api.addFiles('mdl-ui.styl', 'client', {isImport: true});

    api.export([
        'MdlUi'
    ]);
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
});
