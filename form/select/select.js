Template.mdlUiSelect.helpers({
    cell: MdlUi.Util.resolveCell,
    'class': function () {
        return MdlUi.Util.resolveClass(this, 'mdl-textfield--floating-label');
    },
    id: function () {
        return MdlUi.Util.resolveId(this, 'mdl-ui-select');
    },
    name: function () {
        return MdlUi.Util.resolveName(this);
    },
    label: function () {
        return MdlUi.Util.resolveLabel(this);
    },
    errorMessage: function () {
        return MdlUi.Util.resolveErrorMessage(this);
    },

    /**
     *
     * @returns {Array|Cursor} with value, label, selected as keys for template to render select options.
     */
    options: function () {
        // config
        var self = this;
        var form = MdlUi.Util.resolveData(self, 'form');

        var schemaDefinition;
        if(form) {
          schemaDefinition = form.schema.getDefinition(self.name);
        } else {
          var form2 = MdlUi.Util.resolveData(self, 'form2');
          if(form2) {
            schemaDefinition = form2.formHandler().schema.getDefinition(self.name);
          }
        }

        var mdlDefinition = schemaDefinition.mdlUi;

        /**
         * Derive options based on:
         *
         * mdl.select is an array of objects with value, label as keys.
         * mdl.select is a function that returns array of object with value, label as keys.
         * mdl.select is an object with moduleName, value, label as keys to retrieve options from a module.
         *
         */

        if (_.isArray(mdlDefinition.select)) {
            // mdl.select is an array of objects with value, label as keys.
            return mdlDefinition.select;

        } else if (_.isFunction(mdlDefinition.select)) {
            // mdl.select is a function that returns array of object with value, label as keys.
            return mdlDefinition.select(mdlDefinition, MdlUi.Util.resolveValue(self));

        } else if (_.isObject(mdlDefinition.select)) {
            // mdl.select is an object with moduleName, value, label as keys to retrieve options from a module.
            return optionsFromModule(mdlDefinition, MdlUi.Util.resolveValue(self));

        } else {
            // do not know how to get options
            debugger;
        }

        function optionsFromModule(mdlDefinition, currentValue) {
            var moduleName = mdlDefinition.select.moduleName;
            var valueField = mdlDefinition.select.value;
            var labelField = mdlDefinition.select.label;

            // construct mongo query
            var collection = Fuse.Module(moduleName).collection;
            var fields = {};
            fields[valueField] = 1;
            fields[labelField] = 1;

            // use
            return collection.find({}, {
                fields: fields,
                sort: [labelField],
                transform: function (doc) {
                    return {
                        value: doc[valueField],
                        label: doc[labelField]
                    };
                }
            });
        }
    },

    selectedOption: function (value) {
        return MdlUi.Util.resolveValue(Template.parentData()) === value;
    }

});
