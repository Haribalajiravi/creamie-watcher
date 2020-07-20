const rimraf = require('rimraf');
const fs = require('fs');
const CreamieBooter = require('./../creamie-booter.js');

describe('Component generation', () => {
  before(() => {
    /* Create test_junks folder before all testcases */
    if (!fs.existsSync(`./test/test_junks`)) {
      fs.mkdirSync(`./test/test_junks`);
      fs.mkdirSync(`./test/test_junks/src`);
      fs.mkdirSync(`./test/test_junks/src/hello`);
      try {
        fs.writeFileSync(
          './test/test_junks/src/hello/hello-component.html',
          '<h1>Hello World!</h1>'
        );
        fs.writeFileSync(
          './test/test_junks/src/hello/hello-component.css',
          '.h1 { color: #ff0000; }'
        );
      } catch (err) {
        throw err;
      }
    }
  });

  it('boot file creation', () => {
    try {
      CreamieBooter.generate('./test/test_junks/src');
    } catch (err) {
      throw err;
    }
  });

  it('boot file existence', () => {
    if (!fs.existsSync(`./test/test_junks/src/hello/hello-boot.js`)) {
      throw 'Boot file is missing!';
    }
  });

  it('assets-boot.js | styles-boot.js should not exists', () => {
    if(fs.existsSync(`./test/test_junks/src/assets/assets-boot.js`)) {
      throw 'assets-boot.js is generating!';
    }
    if(fs.existsSync(`./test/test_junks/src/styles/styles-boot.js`)) {
      throw 'styles-boot.js is generating!';
    }
  });

  after(() => {
    /* Flushing all junk data before testcase */
    rimraf(`./test/test_junks`, function () {
      console.log(
        `\tAll the testing junks removed! \n\tTesting done. \n`
      );
    });
  });
});
