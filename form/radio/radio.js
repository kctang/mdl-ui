'use strict';

Template.mdlUiRadio.helpers({
  'class'() {
    return this['class'];
  },
  name() {
    return MdlUi.Util2.resolveName(this);
  },
  label() {
    return MdlUi.Util2.resolveLabel(this);
  },
  id() {
    return MdlUi.Util2.resolveId(this, 'mdl-ui-radio');
  },
  checked() {
    var context = this;
    // --- 1: return checked if specified by template parameter
    if (context.checked === true) {
      return 'checked';
    }

    // --- 2: return checked if template parameter "value" is specified and is the same as form value
    var radioValue = context.value;
    if (radioValue !== undefined) {
      var form = MdlUi.Util2.resolveData(context, 'form');
      if (form) {
        var currentValue = form.value(context.name, context.indexes);
        if ('' + radioValue === currentValue) {
          return 'checked';
        }
      }
    }

    // --- 3: not checked
    return '';
  },
  value() {
    return MdlUi.Util2.resolveValue(this);
  }
});
