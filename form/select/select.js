Template.mdlUiSelect.helpers({
    cell: MdlUi.Util.resolveCell,
    'class': function () {
        return MdlUi.Util2.resolveClass(this, 'mdl-textfield--floating-label');
    },
    id: function () {
        return MdlUi.Util2.resolveId(this, 'mdl-ui-select');
    },
    name: function () {
        return MdlUi.Util2.resolveName(this);
    },
    label: function () {
        return MdlUi.Util2.resolveLabel(this);
    },
    errorMessage: function () {
        return MdlUi.Util2.resolveErrorMessage(this);
    },

    /**
     *
     * @returns {Array|Cursor} with value, label, selected as keys for template to render select options.
     */
    options: function () {
      // --- 1: return options as specified by template parameter
      if (_.isArray(this.options)) {
        return this.options;
      }

      // --- 2: get options for field from schema definition's "mdlUi" extension
      // --- 2.1: array of objects with "value" and "label" as keys
      // --- 2.2: function that returns array of objects with "value" and "label" as keys
      // --- 2.3: retrieve options from module
      var options = undefined;
      var schemaDefinition = MdlUi.Util2.resolveSchemaDefinition(this);
      if (schemaDefinition) {
        var mdlUiDefinition = schemaDefinition.mdlUi;

        if(mdlUiDefinition && mdlUiDefinition.select) {
          if (_.isArray(mdlUiDefinition.select)) {
            // --- 2.1
            options = mdlUiDefinition.select;

          } else if (_.isFunction(mdlUiDefinition.select)) {
            // --- 2.2
            options = mdlUiDefinition.select(mdlUiDefinition, MdlUi.Util2.resolveValue(this));

          } else if (_.isObject(mdlUiDefinition.select)) {
            // --- 2.3
            return optionsFromModule(mdlUiDefinition, MdlUi.Util2.resolveValue(this));

            function optionsFromModule(mdlDefinition, currentValue) {
              'use strict';

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
                  // transform returned document to be suitable for display as select options
                  return {
                    value: doc[valueField],
                    label: doc[labelField]
                  };
                }
              });
            }

          } else {
            throw new Error(`Unexpected mdlUi.select value in schema [${this.name}]`);
          }
        }
      }

      // --- 3: return empty array
      if(!options) {
        console.debug(`mdlUiSelect options not found [${this.name}]`);
      }
      return options;
    },

    selectedOption: function (value) {
        return MdlUi.Util2.resolveValue(Template.parentData()) === value;
    }

});
