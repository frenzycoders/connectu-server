
const UserModel = require('./../Routes/user/models/user.model')
const isUserAuthenticated = async (req, res, next) => {
    try {
        const token = req.header('x-user');
        const user = await UserModel.findUserByToken(token);

        if (!user[0]) res.status(404).send({ msg: "token Expire" });
        else {
            req.user = user[0];
            req.token = token;
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(404).send({ msg: "token Expire" });
    }
}
module.exports = { isUserAuthenticated }
