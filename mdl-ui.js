// TODO: switch to zaku:deep-extend
(function extendUnderscoreWithDeepExtend() {
    /*  Copyright (C) 2012-2014  Kurt Milam - http://xioup.com | Source: https://gist.github.com/1868955
     *
     *  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
     *  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
     *
     *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
     **/
    function deepExtend(obj) {
        var parentRE = /#{\s*?_\s*?}/,
            slice = Array.prototype.slice;

        _.each(slice.call(arguments, 1), function(source) {
            for (var prop in source) {
                if (_.isUndefined(obj[prop]) || _.isFunction(obj[prop]) || _.isNull(source[prop]) || _.isDate(source[prop])) {
                    obj[prop] = source[prop];
                }
                else if (_.isString(source[prop]) && parentRE.test(source[prop])) {
                    if (_.isString(obj[prop])) {
                        obj[prop] = source[prop].replace(parentRE, obj[prop]);
                    }
                }
                else if (_.isArray(obj[prop]) || _.isArray(source[prop])){
                    if (!_.isArray(obj[prop]) || !_.isArray(source[prop])){
                        throw new Error('Trying to combine an array with a non-array (' + prop + ')');
                    } else {
                        obj[prop] = _.reject(_.deepExtend(_.clone(obj[prop]), source[prop]), function (item) { return _.isNull(item);});
                    }
                }
                else if (_.isObject(obj[prop]) || _.isObject(source[prop])){
                    if (!_.isObject(obj[prop]) || !_.isObject(source[prop])){
                        throw new Error('Trying to combine an object with a non-object (' + prop + ')');
                    } else {
                        obj[prop] = _.deepExtend(_.clone(obj[prop]), source[prop]);
                    }
                } else {
                    obj[prop] = source[prop];
                }
            }
        });
        return obj;
    };

    _.mixin({ 'deepExtend': deepExtend });

    /**
     * Dependency: underscore.js ( http://documentcloud.github.com/underscore/ )
     *
     * Mix it in with underscore.js:
     * _.mixin({deepExtend: deepExtend});
     *
     * Call it like this:
     * var myObj = _.deepExtend(grandparent, child, grandchild, greatgrandchild)
     *
     * Notes:
     * Keep it DRY.
     * This function is especially useful if you're working with JSON config documents. It allows you to create a default
     * config document with the most common settings, then override those settings for specific cases. It accepts any
     * number of objects as arguments, giving you fine-grained control over your config document hierarchy.
     *
     * Special Features and Considerations:
     * - parentRE allows you to concatenate strings. example:
     *   var obj = _.deepExtend({url: "www.example.com"}, {url: "http://#{_}/path/to/file.html"});
     *   console.log(obj.url);
     *   output: "http://www.example.com/path/to/file.html"
     *
     * - parentRE also acts as a placeholder, which can be useful when you need to change one value in an array, while
     *   leaving the others untouched. example:
     *   var arr = _.deepExtend([100,    {id: 1234}, true,  "foo",  [250, 500]],
     *                          ["#{_}", "#{_}",     false, "#{_}", "#{_}"]);
     *   console.log(arr);
     *   output: [100, {id: 1234}, false, "foo", [250, 500]]
     *
     * - The previous example can also be written like this:
     *   var arr = _.deepExtend([100,    {id:1234},   true,  "foo",  [250, 500]],
     *                          ["#{_}", {},          false, "#{_}", []]);
     *   console.log(arr);
     *   output: [100, {id: 1234}, false, "foo", [250, 500]]
     *
     * - And also like this:
     *   var arr = _.deepExtend([100,    {id:1234},   true,  "foo",  [250, 500]],
     *                          ["#{_}", {},          false]);
     *   console.log(arr);
     *   output: [100, {id: 1234}, false, "foo", [250, 500]]
     *
     * - Array order is important. example:
     *   var arr = _.deepExtend([1, 2, 3, 4], [1, 4, 3, 2]);
     *   console.log(arr);
     *   output: [1, 4, 3, 2]
     *
     * - You can remove an array element set in a parent object by setting the same index value to null in a child object.
     *   example:
     *   var obj = _.deepExtend({arr: [1, 2, 3, 4]}, {arr: ["#{_}", null]});
     *   console.log(obj.arr);
     *   output: [1, 3, 4]
     *
     **/
})();

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
            return MdlUi.Util.resolveData(this, 'form');
        })
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
