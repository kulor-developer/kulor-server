const http = require("http");

class App {
    constructor() {
        this.mwFns = [];
        this.server = http.createServer((req, res) => {
            let self = {
                    req: req,
                    res: res,
                    body: "",
                    status: 404
                },
                count = this.mwFns.length;
            this.mwFns.forEach(fn => {
                (async function() {
                    await fn.call(self);
                    !--count && res.end(self.body);
                })();
            });
        });
    }
    use(fn) {
        this.mwFns.push(fn);
        return this;
    }
    run(port) {
        this.server.listen(port);
        console.log(`Server run at ${port}`);
    }
}

module.exports = App;
