const watch = require('node-watch');
const CreamieBooter = require('./creamie-booter.js');
let avoidEventFlag = 0;

const avoidMultipleEvents = function () {
  avoidEventFlag = avoidEventFlag ^ 1;
};

const CreamieWatcher = {
  watch: function () {
    CreamieBooter.generate();
    watch(
      'src',
      {
        recursive: true,
      },
      function (event, filename) {
        if (!avoidEventFlag && /\.(html|css)$/.test(filename)) {
          if (filename) {
            console.log(`${filename} modified!`);
            CreamieBooter.generate();
          }
        }
        avoidMultipleEvents();
      }
    );
  },
  boot: function () {
    CreamieBooter.generate();
  },
};

module.exports = CreamieWatcher;
