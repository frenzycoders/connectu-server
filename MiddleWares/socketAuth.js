
const UserModel = require('./../Routes/user/models/user.model')
const isSocketAuthenticated = async (token) => {
    //console.log(token);
    try {
        const user = await UserModel.findUserByToken(token);
        //console.log(user);
        if (!user[0]) return { status: false }
        else {
            return { status: true, user: user[0] };
        }
    } catch (error) {
        return { status: false }
    }
}
module.exports = { isSocketAuthenticated }
