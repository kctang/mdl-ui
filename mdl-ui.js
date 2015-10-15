var defaultOptions = {
    title: 'Application',
    menuItems: [
        {label: 'About', action: '/about'}
    ]
};

MdlUi = {
    options: {}
};

MdlUi.configure = function (_options) {
    MdlUi.options = _.defaults(_options || {}, defaultOptions);
};

MdlUi.init = function () {
    SimpleSchema.extendOptions({
        mdlUi: Match.Optional(Object)
    });

    Meteor.startup(function () {
        if (Meteor.isClient) {
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
                return MdlUi.Util.resolveData(this, 'form');
            })
        }
    });
};

// auto init
MdlUi.init();

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
        if (hasError(context)) {
            classes += ' is-invalid';
        }

        return classes;

        function hasError(context) {
            var indexedName = MdlUi.Util.toIndex(context.name, context.indexes);
            var form = MdlUi.Util.resolveData(context, 'form');
            var error = form.errors()[indexedName];

            return _.isObject(error) && _.has(error, 'type');
        }
    },

    resolveId(context, prefix) {
        var id = context.id || MdlUi.Util.resolveName(context);
        return prefix + '-' + id;
    },

    resolveLabel(context) {
        var label = context.label;
        var name = context.name;
        if (name === undefined) {
            // name attribute not specified, just return label
            return label;
        } else {
            var form = MdlUi.Util.resolveData(context, 'form');
            return label || form.schema.label(name) || '{!schema}' + name;
        }
    },

    resolveValue(context) {
        var form = MdlUi.Util.resolveData(context, 'form');
        var resolvedName = context.name;

        if (resolvedName.indexOf('.$') !== -1) {
            if (context.indexes === undefined) {
                throw new Meteor.Error('Indexes required to resolve [' + resolvedName + '] not available');
            }
            resolvedName = MdlUi.Util.toIndex(resolvedName, context.indexes);
        }

        return MdlUi.Util.getValue(form.data(), resolvedName);
    },

    resolveErrorMessage(context) {
        var name = context.name;
        var indexes = context.indexes;
        var indexedName = MdlUi.Util.toIndex(name, indexes);
        var form = MdlUi.Util.resolveData(context, 'form');
        var error = form.errors()[indexedName];
        if (_.isObject(error) && _.has(error, 'message')) {
            return error.message;
        } else {
            return '';
        }
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
        var indexedName = MdlUi.Util.toIndex(context.name, context.indexes);
        var form = MdlUi.Util.resolveData(context, 'form');
        var error = form.errors()[indexedName];

        return _.isObject(error) && _.has(error, 'type');
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

        // still can't find, fix this
        if (val === undefined) {
            debugger;
        }

        return val;
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

        console.log('Unable to find data [' + name + ']');
        return undefined;
    },

    // --- read/write values from form

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

    }
};

