Template.mdlUiPageLayout.helpers({
    title() {
        return this.title || MdlUi.options.title || 'Untitled Page';
    },

    menuItems() {
        return false;
    }
});

Template.mdlUiPageLayout.events({
    'click .mdl-layout-icon': function() {
        history.go(-1);
    }
});

