class HandlerBase {
    constructor() {}
    set server(server) {
        this.__server = server;
    }
    get server() {
        return this.__server;
    }
    post(url, params, opt) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(
                    `${url} - ${JSON.stringify(params)} - ${JSON.stringify(
                        opt
                    )}`
                );
            }, 1);
        });
    }
    async doPOST() {}
    async doGET() {}
    async doJob() {
        let fnName = `do${this.server.req.method}`;
        if ("function" === typeof this[fnName]) {
            this.pug = this.server.pug;
            return await this[fnName]();
        } else {
            throw new Error(`function ${fnName} is undefined`);
            return undefined;
        }
    }
}

module.exports = HandlerBase;