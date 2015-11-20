Template.mdlUiTextarea.helpers({
    cell: MdlUi.Util.resolveCell,
    'class': function() {
        return MdlUi.Util2.resolveClass(this, 'mdl-textfield--floating-label');
    },
    id: function () {
        return MdlUi.Util2.resolveId(this, 'MdlTextarea');
    },
    name: function() {
        return MdlUi.Util2.resolveName(this);
    },
    rows: function () {
        return this.rows || 5;
    },
    label: function () {
        return MdlUi.Util2.resolveLabel(this);
    },
    value: function () {
        return MdlUi.Util2.resolveValue(this);
    },
    errorMessage: function () {
        return MdlUi.Util2.resolveErrorMessage(this);
    }
});

