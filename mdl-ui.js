MdlUi = {
    configure: function (options) {
        MdlUi._options.title = options.title;
    }
};

MdlUi._options = {
    title: 'Application',
    menuItems: [
        {label: 'About', action: '/about'}
    ]
};

Meteor.startup(function () {

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

});
