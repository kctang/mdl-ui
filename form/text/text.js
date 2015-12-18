'use strict';

Template.mdlUiText.helpers({
  cell: MdlUi.Util.resolveCell,
  'class': function () {
    var resolvedClass = MdlUi.Util2.resolveClass(this, 'mdl-textfield--floating-label');

    if(this.disabled===true) {
      resolvedClass += ' disabled';
    }

    return resolvedClass;
  },
  id: function () {
    return MdlUi.Util2.resolveId(this, 'mdl-ui-text');
  },
  name: function () {
    return MdlUi.Util2.resolveName(this);
  },
  label: function () {
    return MdlUi.Util2.resolveLabel(this);
  },
  value: function () {
    var value = MdlUi.Util2.resolveValue(this);

    var schemaType = MdlUi.Util2.resolveSchemaType(this);
    if (schemaType === Date) {
      value = moment(value).format('ll');
    }

    return value;
  },
  errorMessage: function () {
    return MdlUi.Util2.resolveErrorMessage(this);
  },
  disabled: function () {
    return this.disabled === true ? 'disabled' : '';
  },
  type: function () {
    return MdlUi.Util2.resolveType(this);
  },
  pattern() {
    return this.pattern;
  },
  extraInputClass() {
    var extraInputClass = '';

    var schemaType = MdlUi.Util2.resolveSchemaType(this);
    if (schemaType === Date) {
      extraInputClass = 'datepicker';
    }

    return extraInputClass;
  }
});

Template.mdlUiText.onRendered(function () {
  if (this.data === null || this.data.name === undefined) {
    throw new Error('Required parameter not found [name]');
  }

  if (MdlUi.Util2.resolveSchemaType(this.data) === Date) {
    this.$('.datepicker').pickadate();
  }
});
