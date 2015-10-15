Template.mdlUiTextarea.helpers({
    cell: MdlUi.Util.resolveCell,
    'class': function() {
        return MdlUi.Util.resolveClass(this, 'mdl-textfield--floating-label');
    },
    id: function () {
        return MdlUi.Util.resolveId(this, 'MdlTextarea');
    },
    name: function() {
        return MdlUi.Util.resolveName(this);
    },
    rows: function () {
        return this.row || 3;
    },
    label: function () {
        return MdlUi.Util.resolveLabel(this);
    },
    value: function () {
        return MdlUi.Util.resolveValue(this);
    },
    errorMessage: function () {
        return MdlUi.Util.resolveErrorMessage(this);
    }
});

