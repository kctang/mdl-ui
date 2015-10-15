Template.mdlUiText.helpers({
    cell: MdlUi.Util.resolveCell,
    'class': function() {
        return MdlUi.Util.resolveClass(this, 'mdl-textfield--floating-label');
    },
    id: function () {
        return MdlUi.Util.resolveId(this, 'MdlText');
    },
    name: function() {
        return MdlUi.Util.resolveName(this);
    },
    label: function() {
        return MdlUi.Util.resolveLabel(this);
    },
    value: function() {
        return MdlUi.Util.resolveValue(this);
    },
    errorMessage: function() {
        return MdlUi.Util.resolveErrorMessage(this);
    },
    disabled: function () {
        return this.disabled === true ? 'disabled' : '';
    },
    type: function () {
        if (this.type) {
            return this.type;
        } else {
            var prop = MdlUi.Util.resolveData(this, 'form').schema.schema(this.name);
            return prop && prop.type === Number ? 'number' : 'text';
        }
    }
});
