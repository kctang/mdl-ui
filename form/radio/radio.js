'use strict';

var getCheckedValue = function (context) {
  var checked = '';

  // --- 1: return checked if specified by template parameter
  if (context.checked === true) {
    checked = 'checked';
  }

  // --- 2: return checked if template parameter "value" is specified and is the same as form value
  var radioValue = context.value;
  if (radioValue !== undefined) {
    var form = MdlUi.Util2.resolveData(context, 'form');
    if (form) {
      var currentValue = form.value(context.name, context.indexes);
      if ('' + radioValue === currentValue) {
        checked = 'checked';
      }
    }
  }

  return checked;
};

Template.mdlUiRadio.onCreated(function () {
  this.reactiveChecked = new ReactiveVar(getCheckedValue(this.data));
});

Template.mdlUiRadio.onRendered(function () {
  var context = this;

  Tracker.autorun(function () {
    context.reactiveChecked.get();

    // TODO: currently will only search parent for .mdl-radio of same name (group)
    // if need to support more, make this an attribute (not doing pre-mature optimization)

    Tracker.afterFlush(function () {
      var currentRadioName = context.firstNode.querySelector('input[type=radio]').name;

      var siblings = context.firstNode.parentNode.querySelectorAll(`.mdl-radio[name=${currentRadioName}]`);
      _.each(siblings, sibling => {
        if (sibling.MaterialRadio) {
          var inputChecked = sibling.querySelector('input').checked;
          if (inputChecked) {
            sibling.MaterialRadio.check();
          } else {
            sibling.MaterialRadio.uncheck();
          }
        }
      });
    });

  });
});

Template.mdlUiRadio.helpers({
  cell: MdlUi.Util.resolveCell,
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
    var checked = getCheckedValue(this);
    Template.instance().reactiveChecked.set(checked);
    return checked;
  },
  value() {
    return MdlUi.Util2.resolveValue(this);
  }
});
