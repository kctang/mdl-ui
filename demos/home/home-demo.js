Template.mdlUiHomeDemo.helpers({
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
        return MdlUi.options.title;
    }
});

Template.mdlUiHomeDemo.events({
    'click .get-started'() {
        alert('You got to do that...');
    }
});
