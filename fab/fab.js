'use strict';

Template.mdlUiFab.events({
    'click button': function (e, view) {
        var detail = {};
        detail.data = _.clone(view.data);
        detail.action = this.valueOf();

        e.target.dispatchEvent(new CustomEvent('mdlUiFab', {
            // from Meteor template event: e.originalEvent.detail will return parameters passed to this template
            detail: detail
        }));
    }
});

Template.mdlUiFab.helpers({
    icon() {
        return this.icon || 'add';
    }
});
