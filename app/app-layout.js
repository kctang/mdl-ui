Template.mdlUiAppLayout.helpers({
    title() {
        var o = MdlUi.options;
        return _.isFunction(o.title) ? o.title() : o.title;
    },

    menuItems() {
        return MdlUi.options.menuItems;
    },

    drawerTemplate() {
        if(Meteor.user()) {
            return 'mdlUiAppDrawer';
        } else {
            return 'mdlUiAppDrawerPublic';
        }
    }
});

Template.mdlUiAppLayout.events({
    'click .mdl-menu__item': function () {
        Router.go(this.action);
    }
});
