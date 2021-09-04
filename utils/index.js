const redisClient = require('./redis');
const smsGateWays = require('./smsGateWays');
const createOtp = require('./createOtp');

const utils = {
    redisClient,
    smsGateWays,
    createOtp,
}

module.exports = {
    utils,
}