const axios = require('axios')
require('dotenv').config();

const sendMessage = async (msg, numbers) => {

    try {
        const headers = {
            "authorization": "bdqvHEKQhMcTWsapAylVZmI0YBetiS8oPJgu6jC572DwnrLGXUBCt0abeDxjH2lFKImTOAP8UsgY6oz1",
            "Content-Type": "application/json"
        }



        const body = {
            route: "v3",
            sender_id: "TXTIND",
            message: msg,
            language: "english",
            flash: 0,
            numbers: numbers.join(",")
        }

        const { data } = await axios.post('https://www.fast2sms.com/dev/bulkV2', body, { headers: headers })

        console.log(data)
    } catch (error) {
        console.log(error.message)
    }

}


module.exports = sendMessage;