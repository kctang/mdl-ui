var defaultOptions = {
    publicDrawer: 'mdlUiAppDrawerPublic',
    drawer: 'mdlUiAppDrawer'
};

var options = _.clone(defaultOptions);

Template.mdlUiAppLayout.helpers({
    title() {
        var o = MdlUi.options;
        return _.isFunction(o.title) ? o.title() : o.title;
    },

    menuItems() {
        return MdlUi.options.menuItems;
    },

    drawerTemplate() {
        // populate options with customization from MdlUi.options
        _.extend(options, _.pick(MdlUi.options, _.keys(defaultOptions)));

        if(Meteor.user()) {
            return options.drawer;
        } else {
            return options.publicDrawer;
        }
    }
});

Template.mdlUiAppLayout.events({
    'click .mdl-menu__item': function () {
        Router.go(this.action);
    }
});
