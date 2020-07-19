const fs = require('fs');
const path = require('path');

var VarConfig = {
  ignore: ['index.html', 'style.css'],
  var: {
    html: [],
    css: [],
  },
  realPath: `src`,
  excludes: ['src/styles', 'src/assets', 'src/boot'],
  getAllFiles: function (currentDirPath, extension, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
      let filePath = path.join(currentDirPath, name);
      let stat = fs.statSync(filePath);
      if (
        stat.isFile() &&
        new RegExp(`.*.(.${extension})`).test(name) &&
        !VarConfig.ignore.includes(name)
      ) {
        console.log(name);
        callback({ path: filePath, filename: name.toLowerCase() });
      } else if (
        stat.isDirectory() &&
        !VarConfig.excludes.includes(filePath) &&
        !VarConfig.var[extension].includes(name)
      ) {
        VarConfig.var[extension].push(name);
        VarConfig.getAllFiles(filePath, extension, callback);
      }
    });
  },
  getHtmlFiles: function () {
    let files = [];
    VarConfig.getAllFiles(VarConfig.realPath, 'html', function (
      data
    ) {
      files.push(data);
    });
    return files;
  },
  getCssFiles: function () {
    let files = [];
    VarConfig.getAllFiles(VarConfig.realPath, 'css', function (data) {
      files.push(data);
    });
    return files;
  },
  readFiles: function () {
    let htmls = VarConfig.getHtmlFiles();
    let csses = VarConfig.getCssFiles();
    return {
      html: htmls.map((html) => {
        return {
          filename: html.filename,
          path: html.path,
          content: fs
            .readFileSync(html.path)
            .toString()
            .split('\n')
            .join(''),
        };
      }),
      css: csses.map((css) => {
        return {
          filename: css.filename,
          path: css.path,
          content: fs
            .readFileSync(css.path)
            .toString()
            .split('\n')
            .join(''),
        };
      }),
    };
  },
  construct: function () {
    let arrays = VarConfig.readFiles();
    let x = {};
    arrays.html.forEach((element) => {
      x[element.filename] = element.content;
    });
    arrays.css.forEach((element) => {
      x[element.filename] = element.content;
    });
    return x;
  },
  generate: function (path) {
    VarConfig.realPath = path ? `${path}` : `src`;
    VarConfig.var = {
      html: [],
      css: [],
    };
    let fileContents = VarConfig.construct();
    VarConfig.var.html.forEach((bootFolder) => {
      let mergedJson = {};
      let htmlFile = `${bootFolder}-component.html`;
      let cssFile = `${bootFolder}-component.css`;
      mergedJson[htmlFile] = fileContents[htmlFile];
      mergedJson[cssFile] = fileContents[cssFile];
      try {
        fs.writeFileSync(
          `${VarConfig.realPath}/${bootFolder}/${bootFolder}-boot.js`,
          `export default ${JSON.stringify(mergedJson)}`,
          { mode: 0o755 }
        );
        console.info(
          '\x1b[32m',
          `html and css successfully generated to ${bootFolder}/${bootFolder}-boot.js✔️`
        );
      } catch (err) {
        console.error(err);
      }
    });
    console.log('\x1b[0m', 'Boot is perfect!');
  },
};

module.exports = VarConfig;
