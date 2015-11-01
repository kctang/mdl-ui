/**
 * @typedef {object} menuItems
 * @property {string} label
 * @property {function|string} action
 * @property {string} [icon]
 */
/**
 *
 * @type {object}
 * @property {menuItems|boolean} [menuItems] Menu items definition. False will not display menu items
 */
var defaultOptions = {
    menuItems: false
};

var validKeys = _.keys(defaultOptions);

function resolveMenuItems(context) {
    // menu items discovery order:
    // 1. from template's data context
    // 2. global MdlUi.options
    // 3. default options defined by this layout
    var options = _.clone(defaultOptions);
    _.extend(options,
        _.pick(MdlUi.options, validKeys),
        _.pick(context, validKeys)
    );

    return options.menuItems;
}

Template.mdlUiPageLayout.helpers({
    title() {
        return this.title || MdlUi.options.title || 'Untitled Page';
    },

    menuItems() {
        return resolveMenuItems(this);
    },

    menuItemsDropDown() {
        return resolveMenuItems(this).length > 2;
    }
});

Template.mdlUiPageLayout.events({
    'click button.back'() {
        history.go(-1);
    },

    'click button.action'(event, template) {
        if (_.isFunction(this.action)) {
            this.action(event, template);
        } else if (_.isString(this.action)) {
            Router.go(this.action);
        }
    }
});

