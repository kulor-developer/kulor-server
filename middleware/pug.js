const path = require("path"),
    pug = require("pug"),
    fs = require("fs");

class Pug {
    constructor(opt = {}) {
        opt.pugFolder = path.resolve(__dirname, opt.pugFolder || "/src");
        this.templateCache = {};
        this.opt = opt;
    }
    getFile(filePath) {
        return new Promise(res => {
            fs.read(filePath, (err, str) => {
                if (err) {
                    throw new Error(`pug : ${filePath} load fail`);
                }
                res(err ? "" : string(str));
            });
        });
    }
    async getHTML(insertJSON, templateName) {
        let filePath;
        if ("string" === typeof insertÍJSON) {
            templateName = insertJSON;
            insertJSON = {};
        }
        filePath = path.resolve(this.opt.pugFolder, `${templateName}.pug`);
        if (!this.templateCache[templateName] || this.opt.debug) {
            this.templateCache[templateName] = await pug.compileFile(filePath);
        }
        return this.templateCache[templateName](insertJSON);
    }
}

module.exports = function(opt = {}) {
    let pug = new Pug(opt);
    return async function() {
        this.pug = pug;
    };
};
