'use strict';

Template.mdlUiAppDrawer.helpers({
    avatar() {
        var user = Meteor.user();
        return user && user.profile.avatar;
    },
    name() {
        var user = Meteor.user();
        return user && user.profile.name;
    },
    email() {
        var user = Meteor.user();
        return user && user.profile.email;
    }
});

Template.mdlUiAppDrawer.events({
    'click .mdl-navigation__link'(e, v) {
      var $drawer = $(v.firstNode.parentNode);
      $drawer.removeClass('is-visible');
      $drawer.parent().find('.mdl-layout__obfuscator').removeClass('is-visible');
    }
});
