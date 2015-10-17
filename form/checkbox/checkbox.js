Template.mdlUiCheckbox.helpers({
    cell: MdlUi.Util.resolveCell,
    name: function() {
        return MdlUi.Util.resolveName(this);
    },
    label: function () {
        return MdlUi.Util.resolveLabel(this);
    },
    'class': function () {
        return this['class'];
    },
    id: function () {
        return MdlUi.Util.resolveId(this, 'mdl-ui-checkbox');
    },
    checked: function () {
        return MdlUi.Util.resolveValue(this) ? 'checked' : '';
    }
});
