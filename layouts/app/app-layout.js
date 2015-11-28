var defaultOptions = {
  publicDrawer: 'mdlUiAppDrawerPublic',
  drawer: 'mdlUiAppDrawer',

  search: false,
  searchSessionName: 'search'

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

  search() {
    // TODO: proper clone in template instance
    var options = _.extend({}, _.pick(MdlUi.options, _.keys(defaultOptions)));
    return options.search;
  },

  drawerTemplate() {
    // populate options with customization from MdlUi.options
    _.extend(options, _.pick(MdlUi.options, _.keys(defaultOptions)));

    if (Meteor.user()) {
      return options.drawer;
    } else {
      return options.publicDrawer;
    }
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
  }, 500)

});
