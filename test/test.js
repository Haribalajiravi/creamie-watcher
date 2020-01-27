const rimraf = require('rimraf');
const fs = require('fs');
const CreamieBooter = require('./../creamie-booter.js');

describe('Component generation', () => {
    before(() => {
        /* Create test_junks folder before all testcases */
        if (!fs.existsSync(`./test/test_junks`)) {
            fs.mkdirSync(`./test/test_junks`);
            fs.mkdirSync(`./test/test_junks/src`);
            try {
                fs.writeFileSync('./test/test_junks/src/hello.html', '<h1>Hello World!</h1>');
                fs.writeFileSync('./test/test_junks/src/hello.css', '.h1 { color: #ff0000; }');
            } catch (err) {
                throw err;
            }
        }
    });

    it('boot.js file creation', () => {
        try {
            CreamieBooter.generate('./test/test_junks/src');
        } catch (err) {
            throw err;
        }
    });

    it('boot.js existence', () => {
        if (!fs.existsSync(`./test/test_junks/src/boot.js`)) {
            throw 'Boot file is missing!'
        }
    });

    after(() => {
        /* Flushing all junk data before testcase */
        rimraf(`./test/test_junks`, function() { console.log(`\tAll the testing junks removed! \n\tTesting done. \n`); });
    });
});