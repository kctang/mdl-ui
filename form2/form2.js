'use strict';

Template.mdlUiForm2.onCreated(function () {
  var data = this.data;
  if (!data) {
    throw new Error('Unable to find data');
  }

  var form2 = new MdlUiForm2(this);

  if (form2.formHandler().load) {
    form2.formHandler().load.call(data, form2);
  }

  data.form2 = form2;
});

Template.mdlUiForm2.events({
  'submit form'(event, template) {
    event.preventDefault();

    var $unset = {};
    var handler = this.form2.formHandler();
    var doc = MdlUi.Util.parseDomForm(event.target);

    var errors;
    if(handler.validate) {
      // use custom validation
      // TODO: not used
      errors = handler.validate.call(this, doc, $unset);
    } else {
      // --- extract $unset from doc
      if(doc['$unset']) {
        $unset = doc['$unset'];
        delete doc['$unset'];
      }

      handler.beforeValidate && handler.beforeValidate.call(this, doc);
      errors = this.form2.validate(doc);
    }

    this.form2.errors(errors);

    if(_.size(errors)>0) {
      console.log(errors);
      console.debug('Failed validation');
      return;
    }

    if(handler.save) {
      handler.save.call(this, {
        $set: doc,
        $unset: $unset
      });
    }
  }
});

var MdlUiForm2 = class MdlUiForm2 {
  constructor(template) {
    this._formHandler = MdlUiForm2.resolveFormHandler(template);
    this._doc = new ReactiveVar({});
    this._errors = new ReactiveVar({});
  }

  doc(doc) {
    if (arguments.length > 0) {
      if (doc === undefined) {
        throw new Error('Cannot set doc as undefined');
      }
      this._doc.set(doc);
    } else {
      return this._doc.get();
    }
  }

  errors(errors) {
    if (arguments.length > 0) {
      if(errors === undefined) {
        throw new Error('Cannot set errors as undefined');
      }
      this._errors.set(errors);
    } else {
      return this._errors.get();
    }
  }

  formHandler() {
    return this._formHandler;
  }

  /**
   *
   * @param doc
   * @param options omit
   * @returns {{}}
   */
  validate(doc, options = {}) {
    var errors = {};
    var schema = this.formHandler().schema;

    // https://github.com/aldeed/meteor-simple-schema
    schema.clean(doc);
    extraClean(schema, doc);

    var validationContext = schema.namedContext('form2');
    validationContext.resetValidation();
    if (!validationContext.validate(doc)) {
      // convert array of errors from simple schema into a map (easy to render)
      _.each(validationContext.invalidKeys(), function (obj) {
        errors[obj.name] = _.omit(obj, 'name', options.omit); // remove redundant object key
        errors[obj.name].message = schema.messageForError(obj.type, obj.name);
      });
    }

    return errors;

    function extraClean(schema, doc) {
      _.each(schema.objectKeys(), function (key) {
        var type = schema.getDefinition(key).type;

        if (type === Array && typeof doc[key] === 'string') {
          // for single file upload in multi form upload
          // convert String values for [String] types into [String]
          doc[key] = [doc[key]];
        }
      })
    }
  }

  static resolveFormHandler(template) {
    // traverse up view chain to find form handler
    var form = undefined;
    var currentTemplate = template;
    var currentView = currentTemplate.view;
    while (currentTemplate && currentView && form === undefined) {
      currentView = currentView.parentView;
      currentTemplate = currentView.template;
      if (currentTemplate !== undefined) {
        form = currentTemplate['__form'];
      }
    }

    if (form === undefined) {
      throw new Error(`Unable to resolve form handler`);
    }

    return form;
  }
};

class MdlUiForm2Plugin {
  init() {
    // populate Template with form handling capability
    for (var prop in Template) {
      if (Blaze.isTemplate(Template[prop])) {
        let template = Template[prop];
        template.form = function (options) {
          // TODO: set defaults
          template.__form = template.__form || {};
          _.each(options, (value, key) => {
            template.__form[key] = value;
          });
        };
      }
    }
  }
}

MdlUi.addPlugin(new MdlUiForm2Plugin());
MdlUi.MdlUiForm2 = MdlUiForm2;
