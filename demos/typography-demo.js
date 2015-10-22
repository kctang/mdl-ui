'use strict';

var typographies = [
    'body-1',
    'body-1-color-contrast',
    'body-1-force-preferred-font',
    'body-1-force-preferred-font-color-contrast',
    'body-2',
    'body-2-color-contrast',
    'body-2-force-preferred-font',
    'body-2-force-preferred-font-color-contrast',

    'headline',
    'headline-color-contrast',
    'title',
    'title-color-contrast',
    'subhead',
    'subhead-color-contrast',
    'menu',
    'menu-color-contrast',
    'button',
    'button-color-contrast',
    'caption',
    'caption-color-contrast',

    'display-1',
    'display-2',
    'display-3',
    'display-4',

    'table-striped',
    'text-capitalize',
    'text-center',
    'text-justify',
    'text-left',
    'text-lowercase',
    'text-nowrap',
    'text-right',
    'text-uppercase'
];

Template.mdlUiTypographyDemo.onCreated(function () {
    Session.set('includes', '');
    Session.set('excludes', 'display');
});

Template.mdlUiTypographyDemo.events({
    'keydown #includes': _.throttle((e)=> Session.set('includes', $(e.target).val()), 300),

    'keydown #excludes': _.throttle((e)=> Session.set('excludes', $(e.target).val()), 300)
});

Template.mdlUiTypographyDemo.helpers({
    includes() {
        return Session.get('includes');
    },
    excludes() {
        return Session.get('excludes');
    },

    typographies() {
        var filtered = _.filter(typographies, function (t) {
            var includes = Session.get('includes');
            var excludes = Session.get('excludes');

            return t.indexOf(includes) !== -1 && (excludes === '' || t.indexOf(excludes) === -1);
        });

        return _.map(filtered, (typography)=> `mdl-typography--${typography}`);
    }
});

