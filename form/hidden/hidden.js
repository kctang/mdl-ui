Template.mdlUiHidden.helpers({
    // TODO: test indexes attribute in template. needed?
    id: function () {
        return MdlUi.Util.resolveId(this, 'MdlUiHidden');
    },
    name: function() {
        return MdlUi.Util.resolveName(this);
    },
    value: function () {
        return MdlUi.Util.resolveValue(this);
    }
});
