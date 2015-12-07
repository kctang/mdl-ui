var defaultOptions = {
  publicDrawer: 'mdlUiAppDrawerPublic',
  drawer: 'mdlUiAppDrawer',

  menuItems: [
    //{label: 'About', action: '/about'}
  ],

  search: false,
  searchSessionName: 'search'

};

// TODO: change usage to resolveOption(...)
var options = _.clone(defaultOptions);

/**
 * Resolve option from:
 *
 * 1. data context
 * 2. default MdlUi options
 *
 * @param context
 * @param name
 * @returns {*}
 */
function resolveOption(context, name) {
  // 1. resolve search from data context
  var option = context && context[name];
  if (_.isFunction(option)) {
    option = option.call();
  }

  // 2. resolve search from MdlUi options
  if (option === undefined) {
    option = MdlUi.options[name];
    if (_.isFunction(option)) {
      option = option.call();
    }
  }

  // 3. resolve from defaultOptions
  if(option===undefined) {
    option = defaultOptions[name];
    if (_.isFunction(option)) {
      option = option.call();
    }
  }

  return option;
}

Template.mdlUiAppLayout.helpers({
  title() {
    return resolveOption(this, 'title');
  },

  menuItems() {
    return resolveOption(this, 'menuItems');
  },

  search() {
    return resolveOption(this, 'search');
  },

  drawerTemplate() {
    var name = 'publicDrawer';
    if (Meteor.user()) {
      name = 'drawer';
    }

    return resolveOption(this, name);
  },

  searchValue() {
    return Session.get(options.searchSessionName);
  }
});

Template.mdlUiAppLayout.events({
  'click .mdl-menu__item'() {
    Router.go(this.action);
  },

  'keydown .search .mdl-textfield__input': _.throttle(function (e) {
    Session.set(options.searchSessionName, $(e.target).val());
  }, 300)

});
