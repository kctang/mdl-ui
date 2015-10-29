/**
 * Determine the data type based on schema. schema cannot be resolved, then returns empty string
 * @param context
 * @returns {*}
 */
function getSchemaType(context) {
    var form = MdlUi.Util.resolveData(context, 'form');

    if (form) {
        var prop = form.schema.schema(context.name);
        return prop.type;
    }

    return '';
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
        if (getSchemaType(this) === Date) {
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
        }

        var form = MdlUi.Util.resolveData(this, 'form');
        if (form) {
            var prop = form.schema.schema(this.name);

            if (prop) {
                switch (prop.type) {
                    case Number:
                        return 'number';
                    default:
                        return 'text';
                }
            }
        }

        return 'text';
    },
    extraInputClass() {
        var form = MdlUi.Util.resolveData(this, 'form');

        if (form) {
            var prop = form.schema.schema(this.name);
            if (prop && prop.type === Date) {
                return 'datepicker';
            }
        }

        return '';
    }
});

Template.mdlUiText.onRendered(function () {
    if(this.data === null || this.data.name===undefined) {
        throw new Error('Required parameter not found [name]');
    }

    var form = MdlUi.Util.resolveData(this.data, 'form');

    if (form) {
        var prop = form.schema.schema(this.data.name);
        if (prop && prop.type === Date) {
            this.$('.datepicker').pickadate();
        }
    }
});
