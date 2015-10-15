
Template.mdlUiForm.events({
    'submit form': function (event) {
        event.preventDefault();
        var form = MdlUi.Util.resolveData(this, 'form');
        form.submit(event.target, {
            saveRoute: this.saveRoute
        });
    },
    'click .cancel': function () {
        Router.go(this.cancelRoute);
    }
});

Template.mdlUiForm.helpers({
    class: function () {
        return this.class || 'mdl-grid mdl-color--white';
    }
});

MdlUi.Form = function (schema, model) {
    'use strict';
    var _form = new ReactiveVar({
        data: {},
        errors: {},
        visible: true
    });
    var _docId = '';

    this.schema = schema;
    this.model = model;

    /**
     * Load data from model to form. If docId is not specified.
     * @param docId
     * @returns {Mdl.Form}
     */
    this.docId = function (docId) {
        if (docId) {
            var doc = model.findOne(docId);
            if (doc) {
                _docId = docId;
                reset(doc);
            } else {
                throw new Meteor.Error('Unable to load document [' + docId + ']');
            }
        } else {
            _docId = '';
            reset();
        }

        return this;
    };

    this.submit = function (domForm, options) {
        options = options || {
                saveRoute: undefined
            };
        var valid = false;
        var errors = {};
        var doc;
        var formSchemaContext;
        var $unset = {};

        // --- parse DOM form
        doc = parseDomForm(domForm);

        // --- extract $unset from doc
        if(doc['$unset']) {
            $unset = doc['$unset'];
            delete doc['$unset'];
        }

        schema.clean(doc);
        extraClean(doc);

        // --- validate DOM form
        formSchemaContext = schema.namedContext('form');
        formSchemaContext.resetValidation();
        if (!formSchemaContext.validate(doc)) {
            _.each(formSchemaContext.invalidKeys(), function (obj) {
                errors[obj.name] = _.omit(obj, 'name');
                errors[obj.name].message = schema.messageForError(obj.type, obj.name);
            });
        } else {
            valid = true;
        }

        // --- update form data & errors
        reactiveFormUpdate({data: doc, errors: errors});

        if (valid) {
            saveModel(model, doc, $unset);
            if (options.saveRoute) {
                // goto route on successful form save
                Router.go(options.saveRoute);
            } else {
                // trigger event on successful form save
                domForm.dispatchEvent(new CustomEvent('mdlUiForm_save', {
                    detail: {
                        docId: _docId,
                        model: model,
                        data: doc
                    }
                }));
            }
        } else {
            console.group('Form validation error');
            _.each(errors, function(v,k) {
                console.group(k);
                console.error(v);
                console.groupEnd();
            });
            console.groupEnd();
        }

        return valid;

        function parseDomForm(form) {
            var doc = {};

            // input[type=text]
            // input[type=number]
            // input[type=hidden]
            // textarea
            _.each(form.querySelectorAll(
                'input[type=text]:not([disabled]), ' +
                'input[type=number]:not([disabled]), ' +
                'textarea:not([disabled]),' +
                'input[type=hidden]'
            ), function (input) {
                // fields with xaction is special, do not process as normal values
                if(!input.hasAttribute('xaction')) {
                    MdlUi.Util.setValue(doc, input.name, input.value);
                }
            });

            // checkbox
            _.each(form.querySelectorAll('input[type=checkbox]'), function (input) {
                MdlUi.Util.setValue(doc, input.name, input.checked);
            });

            // select
            _.each(form.querySelectorAll('select'), function (select) {
                var value = undefined;
                _.each(select.selectedOptions, function (selectedOption) {
                    if (_.isUndefined(value)) {
                        // add as simple value
                        value = selectedOption.value;
                    } else if (_.isArray(value)) {
                        // push value to existing array
                        value.push(selectedOption.value);
                    } else {
                        // should be string, create array and add it
                        value = [value];
                    }
                });

                if (value) {
                    MdlUi.Util.setValue(doc, select.name, value);
                }
            });

            // xaction=remove-element
            _.each(form.querySelectorAll('input[xaction=remove-element]'), function (input) {

                // --- make sure parentField extraction is correct
                var parentField = input.value.substring(0, input.value.lastIndexOf('.'));
                if(MdlUi.Util.getValue(doc, parentField) === undefined) {
                    console.error('Unexpected value being deleted [' + input.value + ']');
                    debugger;
                }

                // --- delete value
                MdlUi.Util.deleteValue(doc, input.value);

                // --- mark parent field to be $unset if its empty
                if(MdlUi.Util.getValue(doc, parentField) === undefined) {
                    // parentField should be removed from document (mongo)
                    doc['$unset'] = doc['$unset'] || {};
                    doc['$unset'][parentField] = '';
                }
            });

            return doc;
        }
    };

    this.visible = function (visible) {
        if (arguments.length > 0) {
            reactiveFormUpdate({visible: visible});
            return this;
        } else {
            return _form.get()['visible'];
        }
    };

    this.data = function (data) {
        if (arguments.length > 0) {
            reactiveFormUpdate({data: data});
        }
        return _form.get()['data'];
    };

    this.errors = function () {
        return _form.get()['errors'];
    };

    this.setValue = function(name, value) {
        var doc = _form.get()['data'];
        MdlUi.Util.setValue(doc, name, value);
        reactiveFormUpdate({});
    };

    function saveModel(model, data, $unset) {
        if (_docId) {
            model.update(_docId, {
                $set: data,
                $unset: $unset
            });
        } else {
            model.insert(data);
        }
    }

    /**
     * Only update keys in data.
     *
     * @param data
     */
    function reactiveFormUpdate(data) {
        data = _.extend(_form.get(), data);
        _form.set(data);
    }

    function reset(defaultData) {
        defaultData = defaultData || {};
        schema.namedContext('form').resetValidation();
        reactiveFormUpdate({data: defaultData, errors: {}});
        return this;
    }

    function extraClean(data) {
        _.each(schema.objectKeys(), function (key) {
            var type = schema.getDefinition(key).type;

            if (type === Array && typeof data[key] === 'string') {
                // for single file upload in multi form upload
                // convert String values for [String] types into [String]
                data[key] = [data[key]];
            }
        })
    }

};
