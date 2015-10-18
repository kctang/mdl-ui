
Template.mdlUiAppDrawerPublic.events({
    'click button.login': function (e) {
        var $drawer = $(e.target).parent().parent().parent();
        $drawer.removeClass('is-visible');
        Router.go('/sign-in');
    }
});
