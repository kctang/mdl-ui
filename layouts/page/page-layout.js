var defaultOptions = {
    menuItems: false
};

var validKeys = _.keys(defaultOptions);

Template.mdlUiPageLayout.helpers({
    title() {
        return this.title || MdlUi.options.title || 'Untitled Page';
    },

    menuItems() {
        // menu items discovery order:
        // 1. from template's data context
        // 2. global MdlUi.options
        // 3. default options defined by this layout
        var options = _.clone(defaultOptions);
        _.extend(options,
            _.pick(MdlUi.options, validKeys),
            _.pick(this, validKeys)
        );

        return options.menuItems;
    }
});

Template.mdlUiPageLayout.events({
    'click .mdl-layout-icon'() {
        history.go(-1);
    },

    'click .mdl-menu__item'(event, template) {
        if (_.isFunction(this.action)) {
            this.action(event, template);
        } else if (_.isString(this.action)) {
            Router.go(this.action);
        }
    }
});

