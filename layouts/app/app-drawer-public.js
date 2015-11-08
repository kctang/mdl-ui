
Template.mdlUiAppDrawerPublic.events({
    'click button.login': function (e) {
        var $drawer = $(e.target).parent().parent().parent();
        $drawer.removeClass('is-visible');
        $drawer.parent().find('.mdl-layout__obfuscator').removeClass('is-visible');
        Router.go('/sign-in');
    }
});
