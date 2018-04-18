const App = require("../"),
    path = require("path");

const app = new App(),
    opt = {
        debug: true,
        busFolder: path.resolve(__dirname, "handler"),
        pugFolder: path.resolve(__dirname, "src")
    };

app
    .use(require("../middleware/pug")(opt))
    .use(require("../middleware/router")(opt))
    .run(20020);
