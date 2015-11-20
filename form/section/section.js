'use strict';

Template.mdlUiSection.onCreated(function () {
  var sections = [];

  // load initial segments based on size of this.data.name in form
  if (this.data.name) {
    var form = MdlUi.Util2.resolveData(this.data, 'form');
    if (form) {
      var segments = form.value(this.data.name);
      if (segments) {
        for (var c = 0; c < segments.length; c++) {
          sections.push({index: c, removed: false});
        }
      }
    }
  }

  this.data.sections = new ReactiveVar(sections);
});

Template.mdlUiSection.events({
  'click #add'(event, template) {
    event.preventDefault();

    var sections = this.sections.get();
    sections.push({index: sections.length, removed: false});
    this.sections.set(sections);
  },

  'click #remove'(event, template) {
    event.preventDefault();

    var sections = Template.parentData(0).sections.get();
    sections[this.index]['removed'] = true;
    Template.parentData(0).sections.set(sections);
  },

  'click #undo'(event, template) {
    event.preventDefault();

    var sections = Template.parentData(0).sections.get();
    sections[this.index]['removed'] = false;
    Template.parentData(0).sections.set(sections);
  }


});

Template.mdlUiSection.helpers({
  cell: MdlUi.Util.resolveCell,

  'elementCell': function() {
    var elementCell = Template.parentData().elementCell || '12'; // set default element cell size

    return MdlUi.Util.resolveCell(elementCell);
  },

  'class': function () {
    return MdlUi.Util2.resolveClass(this);
  },

  id: function () {
    return MdlUi.Util2.resolveId(this, 'mdl-section');
  },

  sections() {
    return this.sections.get();
  },

  label() {
    return MdlUi.Util2.resolveLabel(this);
  },

  indexLabel() {
    var label = MdlUi.Util2.resolveLabel(Template.parentData());
    var sectionCount = Template.parentData(1).sections.get().length;
    if(this.removed) {
      return `Deleted - ${label} - ${this.index + 1} of ${sectionCount}`;
    } else {
      return `${label} - ${this.index + 1} of ${sectionCount}`;
    }

  }

});
