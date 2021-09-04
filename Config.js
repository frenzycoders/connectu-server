const { Errors } = require('./Error');
const path = require('./pathConfig');
const upload = require('express-fileupload');
module.exports = (app) => {
    app.use(upload());
    path.map((e) => {
        console.log(e.path)
        app.use(e.path, e.control);
    })
    //For Default 404 error
    app.use((req, res, next) => {
        Errors.Error404(req, res)
    })
}
