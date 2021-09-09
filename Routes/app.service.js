const User = require("./user/models/user.model");

class AppServices {

    async fetchUserDetails(req, res) {
        try {
            let { number } = req.params;
            let user = await User.findOne({ number: number });
            if (!user) return res.status(404).send({ message: "User not found." });
            res.status(200).send(user);
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }


    //Create 
    async CreateAppServices(req, res) {
        res.status(200).send({ msg: "OK" })
    }

    //Fetch All
    async FetchAllAppServices(req, res) {
        res.status(200).send({ msg: "OK" })
    }

    //Fetch SIngle 
    async FetchSingleAppServices(req, res) {
        res.status(200).send({ msg: "OK" })
    }

    //Delete All Service
    async DeleteAllAppServices(req, res) {
        res.status(200).send({ msg: "OK" })
    }

    //Delete Single Service
    async DeleteSingleAppServices(req, res) {
        res.status(200).send({ msg: "OK" })
    }

    async fetchUserById(req,res) {
        try {
            
        } catch (error) {
            
        }
    }
}

const appService = new AppServices();
module.exports = appService;