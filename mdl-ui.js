var defaultOptions = {
    title: 'Application',
    menuItems: [
        //{label: 'About', action: '/about'}
    ]
};

var plugins = [];
MdlUi = {
    options: defaultOptions
};

MdlUi.configure = function (_options) {
    _.deepExtend(MdlUi.options, _options);
};

MdlUi.addPlugin = function (plugin) {
    plugins.push(plugin);
};

MdlUi.preInit = function () {
    SimpleSchema.extendOptions({
        mdlUi: Match.Optional(Object)
    });
};

MdlUi.init = function () {
    Meteor.isClient && Meteor.startup(function () {
        // --- register global template helpers
        Template.registerHelper('mdlUiCell', function (cell) {
            switch (typeof cell) {
                case 'number':
                    return 'mdl-cell mdl-cell--' + cell + '-col';
                case 'string':
                    var cells = cell.split(',');
                    if (cells.length === 3) {
                        return 'mdl-cell mdl-cell--' + cells[0] + '-col-phone mdl-cell--' + cells[1] + '-col-tablet mdl-cell--' + cells[2] + '-col-desktop';
                    } else if (cells.length === 1) {
                        return 'mdl-cell mdl-cell--' + cells[0] + '-col';
                    } else {
                        throw new Error('Incorrect value for mdlUiCell');
                    }
                default:
                    return 'mdl-cell';
            }
        });

        Template.registerHelper('form', function () {
            return MdlUi.Util.resolveDataOrThrowError(this, 'form');
        });

    });

    // init plugins
    _.each(plugins, (plugin)=> plugin.init());
};

MdlUi.preInit();

// ----- util

MdlUi.Util = {
    resolveName(context) {
        return MdlUi.Util.toIndex(context.name, context.indexes);
    },

    resolveClass(context, defaultClasses) {
        if (!context || context['SET_VALUE'] === 2) {
            // incorrect context assignment
            debugger;
        }

        var classes = context['class'] || defaultClasses || '';
        if (MdlUi.Util.hasError(context)) {
            classes += ' is-invalid';
        }

        return classes;
    },

    resolveId(context, prefix) {
        var id = context.id || MdlUi.Util.resolveName(context);
        return prefix + '-' + id;
    },

    /**
     * Order:
     *
     * - this.label
     * - resolve label from form using schema definition for this.name
     * - this.name
     */
    resolveLabel(context) {
        var label = context.label;
        if (label) {
            return label;

        }

        var name = context.name;
        if (!name) {
            throw new Error('Either name or label must be specified to resolve label');
        }

        var form = MdlUi.Util.resolveData(context, 'form');
        if (form) {
            return form.schema.label(name) || '{!schema}' + name;
        }

        return MdlUi.Util.toTitleCase(name);
    },

    /**
     * Resolve value based on this sequence:
     *
     * - this.value
     * - resolve value from form
     * - resolve value from form2
     * - returns empty string
     */
    resolveValue(context) {
        if (context.value !== undefined) {
            return context.value;
        }

        var form = MdlUi.Util.resolveData(context, 'form');
        if (form) {
            var resolvedName = context.name;
            if (resolvedName.indexOf('.$') !== -1) {
                if (context.indexes === undefined) {
                    throw new Meteor.Error('Indexes required to resolve [' + resolvedName + '] not available');
                }
                resolvedName = MdlUi.Util.toIndex(resolvedName, context.indexes);
            }

            return MdlUi.Util.getValue(form.data(), resolvedName);
        }

      // form2 support
      var form2 = MdlUi.Util.resolveData(context, 'form2');
      if(form2) {
        var resolvedName = context.name;
        if (resolvedName.indexOf('.$') !== -1) {
          if (context.indexes === undefined) {
            throw new Meteor.Error('Indexes required to resolve [' + resolvedName + '] not available');
          }
          resolvedName = MdlUi.Util.toIndex(resolvedName, context.indexes);
        }

        return MdlUi.Util.getValue(form2.doc(), resolvedName);
      }

        return '';
    },

    resolveErrorMessage(context) {
        var form = MdlUi.Util.resolveData(context, 'form');
        if (form) {
            var name = context.name;
            var indexes = context.indexes;
            var indexedName = MdlUi.Util.toIndex(name, indexes);
            var error = form.errors()[indexedName];

            if (_.isObject(error) && _.has(error, 'message')) {
                return error.message;
            }
        }

        var form2 = MdlUi.Util.resolveData(context, 'form2');
        if(form2) {
          debugger;
          var name = context.name;
          var indexes = context.indexes;
          var indexedName = MdlUi.Util.toIndex(name, indexes);
          var error = form2.errors()[indexedName];

          if (_.isObject(error) && _.has(error, 'message')) {
            return error.message;
          }
        }

        return '';
    },

    resolveCell(cell) {

        // if parameter not specified, get from this.cell
        if (arguments.length === 0) {
            if (this['SET_VALUE'] === 2) {
                // incorrect context assignment
                debugger;
            }
            cell = this.cell;
        }

        switch (typeof cell) {
            case 'number':
                return 'mdl-cell mdl-cell--' + cell + '-col';
            case 'string':
                var cells = cell.split(',');
                if (cells.length === 3) {
                    return 'mdl-cell mdl-cell--' + cells[0] + '-col-phone mdl-cell--' + cells[1] + '-col-tablet mdl-cell--' + cells[2] + '-col-desktop';
                } else if (cells.length === 1) {
                    return 'mdl-cell mdl-cell--' + cells[0] + '-col';
                } else {
                    throw new Meteor.Error('Incorrect value for attribute [cell]');
                }
            default:
                return 'mdl-cell';
        }
    },

    hasError(context) {
        var form = MdlUi.Util.resolveData(context, 'form');
        if (form) {
            var indexedName = MdlUi.Util.toIndex(context.name, context.indexes);
            var error = form.errors()[indexedName];

            return _.isObject(error) && _.has(error, 'type');
        } else {
            return false;
        }
    },

    resolveData(context, name) {
        context = context || this;

        if (context['SET_VALUE'] === 2) {
            // incorrect context assignment
            debugger;
        }

        // resolve value from current context (this)
        var val = context[name];
        if (val === undefined) {
            // resolve value form ancestor contexts
            val = MdlUi.Util.findDataInAncestor(name);
        }

        return val;
    },

    resolveDataOrThrowError(context, name) {
        var data = MdlUi.Util.resolveData(context, name);
        if (!data) {
            throw new Error(`Unable to resolve data [${name}]`);
        }
        return data;
    },

    /**
     * Try very hard to find named key in current template or any ancestor templates.
     *
     * still buggy?!
     *
     * @param name
     * @returns {*}
     * @deprecated should not be used because...no longer needed?
     */
        findDataInAncestor(name) {
        var value = Template.instance().data[name];

        if (value !== undefined) {
            // current context has named data
            return value;
        }
        var currentView = Template.instance().view.parentView;

        while (currentView !== null) {
            if (_.has(currentView, '_templateInstance') &&
                _.has(currentView._templateInstance, 'data') &&
                currentView._templateInstance.data !== null) {
                value = currentView._templateInstance.data[name];
                if (value !== undefined) {
                    return value;
                }
            }

            if (_.has(currentView, 'originalParentView')) {
                currentView = currentView.originalParentView;
            } else {
                currentView = currentView.parentView;
            }
        }

        //console.log('Unable to find data [' + name + ']');
        return undefined;
    },

    // --- read/write values from form
    parseDomForm(form) {
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

    if (value || value==='') {
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
},

    getValue(doc, name) {
        var value = MdlUi.Util.locateValue(doc, name, undefined, MdlUi.Util.GET_VALUE);
        //console.debug('Get property [' + name + '] value [' + value + ']');
        return value;
    },

    setValue(doc, name, value) {
        MdlUi.Util.locateValue(doc, name, value, MdlUi.Util.SET_VALUE);
        //console.debug('Set property [' + name + '] value [' + value + ']');
    },

    deleteValue(doc, name) {
        MdlUi.Util.locateValue(doc, name, undefined, MdlUi.Util.DELETE_VALUE);
        console.debug('Delete value [' + name + ']');
    },

    GET_VALUE: 1,
    SET_VALUE: 2,
    DELETE_VALUE: 3,

    locateValue(doc, name, value, action) {
        if (doc === undefined) {
            console.log('Undefined doc when locating value of [' + name + ']');
            debugger;
        }

        var segments = name.split(/\./);

        // track parentObj & parentSegmentName so that we can remove empty array/obj for DELETE_VALUE
        var parentObj = undefined;
        var parentSegmentName = undefined;

        var obj = doc;
        for (var idx = 0; idx < segments.length; idx++) {
            var segment = segments[idx]; // cannot be number
            var nextSegment = segments[idx + 1]; // maybe number
            if (/^\d+$/.test(nextSegment)) {
                idx++;
                // handle as array
                var arr = getArraySegment(obj, segment);

                // set value if this is the last segment
                var arrIdx = Number.parseInt(nextSegment);
                if (idx + 1 >= segments.length) {
                    // set value
                    if (arr.length < arrIdx + 1) {
                        arr.length = arrIdx + 1;
                    }
                    switch (action) {
                        case MdlUi.Util.GET_VALUE:
                            return arr[arrIdx];
                        case MdlUi.Util.SET_VALUE:
                            arr[arrIdx] = value;
                            return;
                        case MdlUi.Util.DELETE_VALUE:
                            arr.splice(arrIdx, 1);
                            if (arr.length === 0) {
                                delete obj[segment];
                            }
                            return;
                        default:
                            throw new Meteor.Error('Unknown FormUtil action');
                    }

                } else {
                    parentObj = obj;
                    parentSegmentName = segment;
                    obj = getArrayElement(arr, arrIdx);
                }

            } else {
                // handle as object

                // set value if this is the last segment
                if (idx + 1 >= segments.length) {
                    // set value
                    switch (action) {
                        case MdlUi.Util.GET_VALUE:
                            return obj[segment];
                        case MdlUi.Util.SET_VALUE:
                            obj[segment] = value;
                            return;
                        case MdlUi.Util.DELETE_VALUE:
                            delete obj[segment];
                            if (_.size(obj) === 0 && parentObj !== undefined) {
                                delete parentObj[parentSegmentName];
                            }
                            return;
                        default:
                            throw new Meteor.Error('Unknown FormUtil action');
                    }

                } else {
                    parentObj = obj;
                    parentSegmentName = segment;
                    obj = getObjectSegment(obj, segment);
                }
            }
        }

        throw new Meteor.Error('Error getting/setting/deleting value [' + name + ']');

        function getArraySegment(obj, segment) {
            var arr = obj[segment];

            if (arr === undefined) {
                arr = [];
                obj[segment] = arr;
            }

            return arr;
        }

        function getArrayElement(arr, idx) {
            if (arr.length < idx + 1) {
                arr.length = idx + 1;
                arr[idx] = {};
            }

            return arr[idx];
        }

        function getObjectSegment(obj, segment) {
            var segmentObj = obj[segment];

            if (segmentObj === undefined) {
                segmentObj = {};
                obj[segment] = segmentObj;
            }

            return segmentObj;
        }
    },

    to$(name) {
        return name.replace(/\.\d+/g, '.$');
    },

    toIndex(name, indexes) {
        if (indexes === undefined) {
            return name;
        } else {
            var currentIdx = 0;
            return name.replace(/\.\$/g, function () {
                if (typeof indexes === 'number') {
                    return '.' + indexes;
                } else {
                    // got to be array
                    return '.' + indexes[currentIdx++];
                }
            });
        }

    },

  // ---
  // http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

};
