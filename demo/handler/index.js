const HandlerBase = require( "../common/handler-base" );

module.exports = class Index extends HandlerBase {
    async getJSON(){
        let res = await this.post( "/user/userDo" );
        return res;
    }
    async doGET(){
        let html = await this.pug.getHTML( "index" );
        return html;
    }
} 