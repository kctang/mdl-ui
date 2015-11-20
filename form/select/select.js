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
      // --- 2.3: TODO: retrieve options from module
      var options = undefined;
      var schemaDefinition = MdlUi.Util2.resolveSchemaDefinition(this);
      if (schemaDefinition) {
        var mdlUiDefinition = schemaDefinition.mdlUi;

        if(mdlUiDefinition && mdlUiDefinition.select) {
          if (_.isArray(mdlUiDefinition.select)) {
            options = mdlUiDefinition.select;

          } else if (_.isFunction(mdlUiDefinition.select)) {
            options = mdlUiDefinition.select(mdlUiDefinition, MdlUi.Util2.resolveValue(this));

          } else if (_.isObject(mdlUiDefinition.select)) {
            throw new Error('TODO: impl this');

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
