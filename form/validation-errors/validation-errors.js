'use strict';

Template.mdlUiValidationErrors.helpers({
  validationErrors() {
    var errors = [];

    _.each(this.form.errors(), function (error) {
      errors.push(error.message);
    });

    return errors;
  }
});
