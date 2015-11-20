Template.mdlUiHidden.helpers({
    id: function () {
        return MdlUi.Util2.resolveId(this, 'mdl-ui-hidden');
    },
    name: function() {
        return MdlUi.Util2.resolveName(this);
    },
    value: function () {
        return MdlUi.Util2.resolveValue(this);
    }
});
