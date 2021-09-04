const AppController = require('./Routes/app.controller');
    const UserController = require('./Routes/user/user.controller');
const SettingsController = require('./Routes/settings/settings.controller');

    module.exports = [
        {
            path:'/user',
            control:UserController
        },{
            path:'/settings',
            control:SettingsController
        },
        {
            path: '/',
            control: AppController
        },
        
    ]