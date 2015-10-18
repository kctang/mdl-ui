function getSchemaType(context) {
    if (!context.schemaType) {
        var prop = MdlUi.Util.resolveData(context, 'form').schema.schema(context.name);
        context.schemaType = prop.type;
    }
    return context.schemaType;
}

Template.mdlUiText.helpers({
    cell: MdlUi.Util.resolveCell,
    'class': function () {
        return MdlUi.Util.resolveClass(this, 'mdl-textfield--floating-label');
    },
    id: function () {
        return MdlUi.Util.resolveId(this, 'MdlUiText');
    },
    name: function () {
        return MdlUi.Util.resolveName(this);
    },
    label: function () {
        return MdlUi.Util.resolveLabel(this);
    },
    value: function () {
        if(getSchemaType(this) === Date) {
            return moment(MdlUi.Util.resolveValue(this)).format('ll');
        } else {
            return MdlUi.Util.resolveValue(this);
        }
    },
    errorMessage: function () {
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
            if (prop) {
                switch (prop.type) {
                    case Number:
                        return 'number';
                    default:
                        return 'text';
                }
            } else {
                return 'text';
            }
        }
    },
    extraInputClass() {
        var prop = MdlUi.Util.resolveData(this, 'form').schema.schema(this.name);
        if(prop && prop.type === Date) {
            return 'datepicker';
        } else {
            return '';
        }
    }
});

Template.mdlUiText.onRendered(function () {
    var prop = MdlUi.Util.resolveData(this.data, 'form').schema.schema(this.data.name);
    if(prop && prop.type === Date) {
        this.$('.datepicker').pickadate();
    }
});
