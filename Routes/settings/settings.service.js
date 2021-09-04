
class SettingsService {

    //Create Settings
    async CreateSettingsService(req, res) {
        res.status(200).send({ msg: "CreateSettingsService" })
    }

    //Fetch All Settings
    async FetchAllSettingsService(req, res) {
        res.status(200).send({ msg: "FetchAllSettingsService" })
    }

    //Fetch SIngle Settings
    async FetchSingleSettingsService(req, res) {
        res.status(200).send({ msg: "FetchSingleSettingsService" })
    }

    //Delete All Settings Service
    async DeleteAllSettingsService(req, res) {
        res.status(200).send({ msg: "DeleteAllSettingsService" })
    }

    //Delete Single Settings Service
    async DeleteSingleSettingsService(req, res) {
        res.status(200).send({ msg: "DeleteSingleSettingsService" })
    }

    //Update Settings Service
    async UpdateSettingsService(req, res) {
        res.status(200).send({ msg: "UpdateSettingsService" })
    }
}

const Settings = new SettingsService();
module.exports = Settings;