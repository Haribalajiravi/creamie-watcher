const fs = require('fs');
const path = require('path');

var VarConfig = {
    ignore: ['index.html', 'style.css'],
    var: 'boot.js',
    realPath: `src`,
    getAllFiles: function(currentDirPath, extension, callback) {
        fs.readdirSync(currentDirPath).forEach(function(name) {
            let filePath = path.join(currentDirPath, name);
            let stat = fs.statSync(filePath);
            if (stat.isFile() && new RegExp(`.*\.(${extension})`).test(name) && !VarConfig.ignore.includes(name)) {
                callback({ path: filePath, filename: name.toLowerCase() });
            } else if (stat.isDirectory()) {
                VarConfig.getAllFiles(filePath, extension, callback);
            }
        });
    },
    getHtmlFiles: function() {
        let files = [];
        VarConfig.getAllFiles(VarConfig.realPath, '.html', function(data) {
            files.push(data);
        });
        return files;
    },
    getCssFiles: function() {
        let files = [];
        VarConfig.getAllFiles(VarConfig.realPath, '.css', function(data) {
            files.push(data);
        });
        return files;
    },
    readFiles: function() {
        let htmls = VarConfig.getHtmlFiles();
        let csses = VarConfig.getCssFiles();
        return {
            html: htmls.map((html) => {
                return {
                    filename: html.filename,
                    path: html.path,
                    content: fs.readFileSync(html.path).toString().split('\n').join('')
                }
            }),
            css: csses.map((css) => {
                return {
                    filename: css.filename,
                    path: css.path,
                    content: fs.readFileSync(css.path).toString().split('\n').join('')
                }
            })
        }
    },
    construct: function() {
        let arrays = VarConfig.readFiles();
        let x = {};
        arrays.html.forEach(element => {
            x[element.filename] = element.content;
        });
        arrays.css.forEach(element => {
            x[element.filename] = element.content;
        });
        return `export default ${JSON.stringify(x)}`;
    },
    generate: function(path) {
        VarConfig.realPath = (path) ? `${path}` : `src`;
        fs.writeFile(`${VarConfig.realPath}/${VarConfig.var}`, VarConfig.construct(), function(err) {
            if (err)
                throw err;
            console.info("\x1b[32m", "Boot: htmls and csses successfully generated to boot.js✔️");
        });
    }
}

module.exports = VarConfig;