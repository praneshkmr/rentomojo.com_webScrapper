var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfig({
    spec_dir: 'spec',
    spec_files: [
        'utils/**/*[sS]pec.js'
    ]
});
jasmine.execute();
