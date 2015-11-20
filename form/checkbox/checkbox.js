'use strict';

Template.mdlUiCheckbox.helpers({
    cell: MdlUi.Util.resolveCell,
    'class': function () {
      return this['class'];
    },
    name: function() {
        return MdlUi.Util2.resolveName(this);
    },
    label: function () {
        return MdlUi.Util2.resolveLabel(this);
    },
    id: function () {
        return MdlUi.Util2.resolveId(this, 'mdl-ui-checkbox');
    },
    checked: function () {
        return MdlUi.Util2.resolveValue(this) ? 'checked' : '';
    }
});
