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
        $(v.firstNode.parentNode).removeClass('is-visible');
    }
});
