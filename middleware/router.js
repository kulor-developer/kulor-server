const path = require( "path" );

class Router {
    constructor( opt = {} ) {
        opt.busFolder = path.resolve( opt.busFolder || "./handler" );
        this.opt = opt;
    }
    handle( originUrl ){
        let url = path.parse( originUrl.replace( /\..*$/ , "" ) ) ,
            filePath = path.resolve( __dirname , this.opt.busFolder , url.name ) ,
            cls;
        if( this.opt.debug ){
            delete require.cache[ filePath ];
            delete require.cache[ `${filePath}.js` ];
        }
        cls = require( filePath );
        return new cls();
    }
}

module.exports = function( opt = {} ){
    let router = new Router( opt );
    return async function(){
        let cls = router.handle( this.req.url ) ,
            body;
        cls.server = this;
        body = await cls.doJob();
        this.body = body;
    }
};