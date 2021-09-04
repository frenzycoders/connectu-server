
const User = require('./models/user.model');
const { mailTransporter } = require('./../../nodemailer')
const bcryptJs = require('bcryptjs');
var randomstring = require("randomstring");
const { utils } = require('../../utils');
const { unlinkSync } = require('fs');
const { UserContact } = require('./models/contacts.model')
class UserServices {


    async FetchUserService(req, res) {
        res.status(200).send({ user: req.user, token: req.token, msg: "User Found.", status: true });
    }



    async joinUserService(req, res) {
        try {
            let { countryCode, number } = req.body;
            let user = await User.findOne({ number: number });
            if (!user) {
                user = await User.create({ countryCode, number });
            }
            let otp = utils.createOtp();
            await utils.smsGateWays(`ONE TIME PASSWORD for connectu login ${otp}`, [number]);
            await utils.redisClient.set(`${user._id}${user.number}_verification_string`, otp, 'EX', 10 * 60 * 5);
            res.status(200).send({ user: user });
        } catch (error) {
            res.status(400).send({ msg: error.message });
        }
    }


    async verifyUserOTP(req, res) {
        try {
            let { number, id } = req.params;
            let { otp } = req.body;
            const redisToken = await utils.redisClient.get(`${id}${number}_verification_string`);
            if (otp && redisToken && redisToken == otp) {
                await utils.redisClient.del(`${id}${number}_verification_string`)
                let user = await User.findById(id);
                let token = await user.genUserToken();
                return res.status(200).send({ msg: "Logged In", user, token });
            }
            else return res.status(404).send({ msg: "Wrong OTP" });
        } catch (error) {
            res.status(400).send({ msg: error.message })
        }
    }

    async resendOtp(req, res) {
        try {
            let { number } = req.params;
            let user = await User.findOne({ number: number });
            if (!user) return res.status(404).send({ msg: "User Not Found" });
            let otp = utils.createOtp();
            await utils.smsGateWays(`ONE TIME PASSWORD for connectu login ${otp}`, [number]);
            await utils.redisClient.set(`${user._id}${user.number}_verification_string`, otp, 'EX', 10 * 60 * 5);
            res.status(200).send({ msg: "OTP Sended", user });
        } catch (error) {
            res.status(400).send({ msg: error.message })
        }
    }

    async updateUserProfile(req, res) {
        try {
            let { name, bio } = req.body;
            req.user.name = name || req.user.name;
            req.user.bio = bio || req.user.bio;
            if (req.files) {
                if (req.user.img) unlinkSync(req.user.img);
                if (!req.files.img) return res.status(404).send({ msg: "you should sed image with img key." });
                let rand = utils.createOtp();
                req.files.img.mv('public/' + rand + req.user._id + '.jpg');
                req.user.img = 'public/' + rand + req.user._id + '.jpg';
            }
            await req.user.save();
            res.status(200).send({ user: req.user, msg: 'Profile updated.' });
        } catch (error) {
            res.status(400).send({ msg: error.message })
        }
    }

    async filterContact(req, res) {
        try {
            let { data } = req.body;
            console.log(data);
            res.status(200).send();
        } catch (error) {

        }
    }
    async fetchAllContactList(req, res) {
        try {
            let { number } = req.params;
            let data = await User.findOne({ number: number }).populate('contacts');
            console.log(data.contacts.contacts.length)
            res.status(200).send({ data });
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
}

const UserService = new UserServices();
module.exports = {
    UserService
}