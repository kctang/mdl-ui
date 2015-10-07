Template.mdlUiDefaultHome.helpers({
    loggedIn() {
        return Meteor.user() ? true : false;
    },
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
    },
    title() {
        return MdlUi._options.title;
    }
});