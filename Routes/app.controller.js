const appController = require('express').Router();
const { checkRequiredFields, checkRequiredHeaders, checkRequiredQueries } = require('../MiddleWares/MiddleWares');
const AppServices = require('./app.service');


appController.get('/check-number/:number', AppServices.fetchUserDetails);
appController.get('/:number', AppServices.FetchSingleAppServices)
appController.post('/', AppServices.CreateAppServices)
appController.get('/user-by-id/:id', AppServices.fetchUserById);
appController.delete('/', AppServices.DeleteAllAppServices)
appController.delete('/:id', AppServices.DeleteSingleAppServices)

module.exports = appController;