const watch = require('node-watch');
const CreamieBooter = require('./creamie-booter.js');

const CreamieWatcher = {
  watch: function () {
    CreamieBooter.generate();
    watch(
      'src',
      {
        recursive: true,
      },
      function (event, filename) {
        if (/\.(html|css)$/.test(filename)) {
          if (filename) {
            console.log(`${filename} modified!`);
            CreamieBooter.generate();
          }
        }
      }
    );
  },
  boot: function () {
    CreamieBooter.generate();
  },
};

module.exports = CreamieWatcher;
