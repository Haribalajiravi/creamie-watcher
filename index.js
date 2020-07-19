#!/usr/bin/env node

let option = process.argv[2];

const CreamieWatcher = require('./creamie-watcher');

if (option) {
  switch (option) {
    case '-i':
      try {
        CreamieWatcher.boot();
      } catch (error) {
        console.error(error);
        console.log(
          '\n\nThis is not the right place run this command.\n - Run this command on your creamie project folder!\n\n'
        );
      }
      break;
    case '-h':
    case 'help':
      console.log(
        '"creamie-watch" - Default command that will start listening for changes on html, css files and boot.'
      );
      console.log(
        '"creamie-watch -i" - ignore the listener but boots the html, css files to boot.js.'
      );
      break;
    default:
      console.log(
        'No Such option available on this command. Use "creamie-watch help".'
      );
  }
} else {
  CreamieWatcher.watch();
}
