## Creamie Watcher [![Build Status](https://travis-ci.org/Haribalajiravi/creamie-watcher.svg?branch=master)](https://travis-ci.org/Haribalajiravi/creamie-watcher)

> Note: This package is only dependant for [creamie-cli](https://www.npmjs.com/package/creamie-cli). Recommend not to use this for any other purpose.

### Usage :
To listen html & css file changes in application folder and creation of boot.js file which contains html & css file contents assigned to a key (key is decided to be a html/css filename for ease).

While development run, changes being done by developer will be captured and loaded in boot.js. Then, our webpack will make use of boot.js to run our application.

### Commands 
To listen for html & css files change along with booter functionality.

	creamie-watch

To load boot.js alone use,

	creamie-watch -i

### Method usage

    const  CreamieWatcher = require('creamie-watcher');
    // watch for html/css files changes and load those in boot.js
    CreamieWatcher.watch();
    // Load boot.js
    CreamieWatcher.boot();

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTI5NDkxNjQ3MCwtMzMyNDU1MzYzXX0=
-->