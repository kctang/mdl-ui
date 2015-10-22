Package.describe({
    name: 'kctang:mdl-ui',
    version: '0.0.4',
    summary: 'Reusable application templates/layouts (experimental)',
    git: 'https://github.com/kctang/mdl-ui',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.0.1');
    api.use([
        'ecmascript',
        'meteor-base',
        // http://stackoverflow.com/questions/32813802/meteor-exception-in-template-helper-referenceerror-match-is-not-defined
        'check',
        'aldeed:simple-schema@1.3.3',
        'momentjs:moment@2.10.6'
    ]);
    api.use([
        'templating',
        'stylus',
        'fermuch:pickadate@1.0.0'
    ], 'client');

    api.addFiles([
        'mdl-ui.js'
    ]);

    api.addFiles([
        'mdl-ui-test.js',
        'head/head.html',
        'head/head.styl'
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

    // forms, fields & UI components
    api.addFiles([
        'fab/fab.css',
        'fab/fab.html',
        'fab/fab.js',

        'form/checkbox/checkbox.html',
        'form/checkbox/checkbox.js',
        'form/checkbox/checkbox.styl',
        'form/hidden/hidden.html',
        'form/hidden/hidden.js',
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
        'form/form.styl'
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
        'demos/settings/settings-demo.styl',
        'demos/typography-demo.html',
        'demos/typography-demo.js'
    ], 'client');

    api.addFiles('mdl-ui.styl', 'client', {isImport: true});

    // assets
    api.addAssets([
        'material-icons/material-icons.css',
        'material-icons/MaterialIcons-Regular.woff2',
        'roboto/roboto.css',
        'roboto/Roboto-Black-cyrillic.woff2',
        'roboto/Roboto-Black-cyrillic-ext.woff2',
        'roboto/Roboto-Black-greek.woff2',
        'roboto/Roboto-Black-greek-ext.woff2',
        'roboto/Roboto-Black-latin.woff2',
        'roboto/Roboto-Black-latin-ext.woff2',
        'roboto/Roboto-Black-vietnamese.woff2',
        'roboto/Roboto-Bold-cyrillic.woff2',
        'roboto/Roboto-Bold-cyrillic-ext.woff2',
        'roboto/Roboto-Bold-greek.woff2',
        'roboto/Roboto-Bold-greek-ext.woff2',
        'roboto/Roboto-Bold-latin.woff2',
        'roboto/Roboto-Bold-latin-ext.woff2',
        'roboto/Roboto-Bold-vietnamese.woff2',
        'roboto/Roboto-BoldItalic-cyrillic.woff2',
        'roboto/Roboto-BoldItalic-cyrillic-ext.woff2',
        'roboto/Roboto-BoldItalic-greek.woff2',
        'roboto/Roboto-BoldItalic-greek-ext.woff2',
        'roboto/Roboto-BoldItalic-latin.woff2',
        'roboto/Roboto-BoldItalic-latin-ext.woff2',
        'roboto/Roboto-BoldItalic-vietnamese.woff2',
        'roboto/Roboto-Italic-cyrillic.woff2',
        'roboto/Roboto-Italic-cyrillic-ext.woff2',
        'roboto/Roboto-Italic-greek.woff2',
        'roboto/Roboto-Italic-greek-ext.woff2',
        'roboto/Roboto-Italic-latin.woff2',
        'roboto/Roboto-Italic-latin-ext.woff2',
        'roboto/Roboto-Italic-vietnamese.woff2',
        'roboto/Roboto-Light-cyrillic.woff2',
        'roboto/Roboto-Light-cyrillic-ext.woff2',
        'roboto/Roboto-Light-greek.woff2',
        'roboto/Roboto-Light-greek-ext.woff2',
        'roboto/Roboto-Light-latin.woff2',
        'roboto/Roboto-Light-latin-ext.woff2',
        'roboto/Roboto-Light-vietnamese.woff2',
        'roboto/Roboto-Medium-cyrillic.woff2',
        'roboto/Roboto-Medium-cyrillic-ext.woff2',
        'roboto/Roboto-Medium-greek.woff2',
        'roboto/Roboto-Medium-greek-ext.woff2',
        'roboto/Roboto-Medium-latin.woff2',
        'roboto/Roboto-Medium-latin-ext.woff2',
        'roboto/Roboto-Medium-vietnamese.woff2',
        'roboto/Roboto-Regular-cyrillic.woff2',
        'roboto/Roboto-Regular-cyrillic-ext.woff2',
        'roboto/Roboto-Regular-greek.woff2',
        'roboto/Roboto-Regular-greek-ext.woff2',
        'roboto/Roboto-Regular-latin.woff2',
        'roboto/Roboto-Regular-latin-ext.woff2',
        'roboto/Roboto-Regular-vietnamese.woff2',
        'roboto/Roboto-Thin-cyrillic.woff2',
        'roboto/Roboto-Thin-cyrillic-ext.woff2',
        'roboto/Roboto-Thin-greek.woff2',
        'roboto/Roboto-Thin-greek-ext.woff2',
        'roboto/Roboto-Thin-latin.woff2',
        'roboto/Roboto-Thin-latin-ext.woff2',
        'roboto/Roboto-Thin-vietnamese.woff2'
    ], 'client');

    api.export([
        'MdlUi'
    ]);
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('tinytest');
});
