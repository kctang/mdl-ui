Template.mdlUiSection.onCreated(function () {
    //MdlUi.Util.inheritParentData();

    var sections = [];

    // TODO: #xxx fix bug - need to refresh sections from doc after form validation failure
    // prepare sections based on size of this.data.name in doc
    if (this.data.name !== undefined) {
        // TODO: #xxx resolved with this vvv ?
        var form = MdlUi.Util.resolveData(this.data, 'form'); // data context is in 'this.data' instead of 'this'
        var doc = form.data();
        var segments = MdlUi.Util.getValue(doc, this.data.name);

        if (segments) {
            for (var c = 0; c < segments.length; c++) {
                sections.push({index: c, removed: false});
            }
        }
    }

    this.sections = new ReactiveVar(sections);
});

Template.mdlUiSection.events({
    'click button.mdlSectionAdd': function (event, template) {
        var sections = template.sections.get();
        sections.push({index: sections.length, removed: false});
        template.sections.set(sections);
    },
    'click button.mdlSectionRemove': function (event, template) {
        var sections = template.sections.get();
        sections[this.index]['removed'] = true;
        template.sections.set(sections);
    },
    'click button.mdlSectionUndo': function (event, template) {
        var sections = template.sections.get();
        sections[this.index]['removed'] = false;
        template.sections.set(sections);
    }
});

Template.mdlUiSection.helpers({
    cell: MdlUi.Util.resolveCell,
    id: function () {
        return MdlUi.Util.resolveId(this, 'MdlSection');
    },
    sections: function () {
        return Template.instance().sections.get();
    },
    sectionShadow: function () {
        return this.removed ? 'mdl-shadow--8dp' : 'mdl-shadow--2dp';
    },
    removeElementIndex: function () {
        return Template.parentData().name + '.' + this.index;
    },

    dynamicMode: function() {
        return this.dynamicMode !== false;
    },

    indexLabel: function() {
        var label = MdlUi.Util.resolveLabel(Template.parentData());
        var sectionCount = Template.instance().sections.get().length;
        return label + ' - ' + (this.index + 1) + ' of ' + sectionCount;
    },
    label: function() {
        return MdlUi.Util.resolveLabel(this);
    }
});
