MdlUi.Util.Test = {
    setValue: function () {
        _.each({
            'obj.prop': function (doc) {
                return doc.obj.prop === 'XXX';
            },
            'array.3.prop': function (doc) {
                return doc.array[3]['prop'] === 'XXX';
            },
            'obj.arr.0': function (doc) {
                return doc.obj.arr[0] === 'XXX';
            },
            'obj.arr.50': function (doc) {
                return doc.obj.arr[50] === 'XXX';
            },
            'obj.arr.50.obj.obj.obj.arr.2': function (doc) {
                return doc.obj.arr[50]['obj'].obj.obj.arr[2] === 'XXX';
            },
            'xobj.xarr.1': function (doc) {
                return doc.xobj.xarr[0] === 'BBB' && doc.xobj.xarr[1] === 'XXX' && doc.xobj.xarr[2] === 'DDD';
            },
            'xobj.newProp': function (doc) {
                return doc.xobj.newProp === 'XXX' && doc.xobj.xprop === 'AAA'
            }

        }, function (assertFn, name) {
            var doc = {
                xobj: {
                    xprop: 'AAA',
                    xarr: [
                        'BBB', 'CCC', 'DDD'
                    ]
                }
            };
            MdlUi.Util.setValue(doc, name, 'XXX');
            if (!assertFn(doc)) {
                console.error('Failed ' + name);
                console.error(doc);
            } else {
                console.info('Passed ' + name);
                //console.info(doc);
            }
        });
    },
    getValue: function () {
        _.each({
            'name': function (val) {
                return val === 'bob';
            },
            'age': function (val) {
                return val === 12;
            },
            'colors.0': function (val) {
                return val === 'red';
            },
            'colors.1': function (val) {
                return val === 'blue';
            },
            'colors.2': function (val) {
                return val === 'green';
            },
            'phones': function (val) {
                return val.home === '123' && val.mobile === '456';
            },
            'phones.home': function (val) {
                return val === '123';
            },
            'addresses': function (val) {
                return _.isArray(val) && val[0].name === 'home';
            },
            'addresses.0.name': function (val) {
                return val === 'home';
            },
            'addresses.1.address': function (val) {
                return val === 'def';
            }
        }, function (assertFn, name) {
            var val = MdlUi.Util.getValue({
                name: 'bob',
                age: 12,
                colors: ['red', 'blue', 'green'],
                phones: {
                    home: '123',
                    mobile: '456'
                },
                addresses: [
                    {
                        name: 'home',
                        address: 'abc'
                    },
                    {
                        name: 'office',
                        address: 'def'
                    }
                ]
            }, name);
            if (!assertFn(val)) {
                console.error('Failed ' + name);
            } else {
                console.info('Passed ' + name);
            }
        });
    },
    deleteValue: function () {

        _.each({
            'name': function (doc) {
                return doc.name === undefined && doc.age === 12 && _.size(doc) === 4;
            },
            'age': function (doc) {
                return doc.name === 'bob' && doc.age === undefined && _.size(doc) === 4;
            },
            'colors.0': function (doc) {
                return doc.name === 'bob' && _.size(doc) === 5 &&
                    doc.colors.length === 2 && doc.colors[0] === 'blue' && doc.colors[1] === 'green';
            },
            'colors.1': function (doc) {
                return doc.name === 'bob' && _.size(doc) === 5 &&
                    doc.colors.length === 2 && doc.colors[0] === 'red' && doc.colors[1] === 'green';
            },
            'colors.2': function (doc) {
                return doc.name === 'bob' && _.size(doc) === 5 &&
                    doc.colors.length === 2 && doc.colors[0] === 'red' && doc.colors[1] === 'blue';
            },
            'phones': function (doc) {
                return _.size(doc) === 4 && doc.phones === undefined;
            },
            'phones.home': function (doc) {
                return _.size(doc) === 5 && _.size(doc.phones) === 1 &&
                    doc.phones.home === undefined && doc.phones.mobile === '456';
            },
            'addresses': function (doc) {
                return _.size(doc) === 4 && doc.addresses === undefined;
            },
            'addresses.0.name': function (doc) {
                return _.size(doc) === 5 && doc.addresses.length === 3 &&
                    _.size(doc.addresses[0]) === 1 && _.size(doc.addresses[1]) === 2 &&
                    doc.addresses[0].name === undefined && doc.addresses[0].address === 'abc';
            },
            'addresses.1.address': function (doc) {
                return _.size(doc) === 5 && doc.addresses.length === 3 &&
                    _.size(doc.addresses[0]) === 2 && _.size(doc.addresses[1]) === 1 &&
                    doc.addresses[1].name === 'office' && doc.addresses[1].address === undefined;
            },
            'addresses.2.arrLink.0': function (doc) {
                return _.size(doc.addresses[2]) === 1 && doc.addresses[2].arrLink === undefined;
            },
            'addresses.2.objLink.url': function (doc) {
                return _.size(doc.addresses[2]) === 1 &&
                    doc.addresses[2].arrLink[0] === 'last' && doc.addresses[2].objLink === undefined;
            }
        }, function (assertFn, name) {
            var doc = {
                name: 'bob',
                age: 12,
                colors: ['red', 'blue', 'green'],
                phones: {
                    home: '123',
                    mobile: '456'
                },
                addresses: [
                    {
                        name: 'home',
                        address: 'abc'
                    },
                    {
                        name: 'office',
                        address: 'def'
                    },
                    {
                        arrLink: ['last'],
                        objLink: {
                            url: 'last'
                        }
                    }
                ]
            };
            MdlUi.Util.deleteValue(doc, name);
            if (!assertFn(doc)) {
                console.error('Failed ' + name);
            } else {
                console.info('Passed ' + name);
            }
        });
    },
    to$: function () {
        _.each({
            'abc': 'abc',
            'abc.2': 'abc.$',
            'abc.2.def': 'abc.$.def',
            'abc.def': 'abc.def',
            'abc.22.def.4.ghi.5': 'abc.$.def.$.ghi.$',
            'abc.2.312.4.def.112.1.21': 'abc.$.$.$.def.$.$.$',
            'abc.def.ghi': 'abc.def.ghi',
            'abd.def.ghi.216': 'abd.def.ghi.$'
        }, function (expectedResult, input) {
            var actualResult = MdlUi.Util.to$(input);
            if (actualResult !== expectedResult) {
                console.error('Failed [' + input + ']. Expected [' + expectedResult + '] but got [' + actualResult + ']');
            } else {
                console.info('Passed [' + input + ']');
            }
        });
    },
    toIndex: function () {
        _.each({
            'abc': ['abc'],
            'abc.$': ['abc.2', 2],
            'abc.$.def': ['abc.2.def', 2],
            'abc.def': ['abc.def'],
            'abc.$.def.$.ghi.$': ['abc.22.def.4.ghi.5', [22, 4, 5]],
            'abc.$.$.$.def.$.$.$': ['abc.2.312.4.def.112.1.21', [2, 312, 4, 112, 1, 21]],
            'abc.def.ghi': ['abc.def.ghi'],
            'abd.def.ghi.$': ['abd.def.ghi.216', 216]
        }, function (stuff, input) {
            var expectedResult = stuff[0];
            var indexes = stuff[1];

            var actualResult = MdlUi.Util.toIndex(input, indexes);
            if (actualResult !== expectedResult) {
                console.error('Failed [' + input + ']. Expected [' + expectedResult + '] but got [' + actualResult + ']');
            } else {
                console.info('Passed [' + input + ']');
            }
        });
    }
};
_.each(MdlUi.Util.Test, function (test, name) {
    console.groupCollapsed('Running nano test [' + name + ']');
    test();
    console.groupEnd();
});
