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
    'click button.logout': function (e) {
        var $drawer = $(e.target).parent().parent().parent();
        $drawer.removeClass('is-visible');

        Router.go('/sign-out');
    }
});