

const { checkRequiredFields, checkRequiredHeaders, checkRequiredQueries } = require('../../MiddleWares/MiddleWares');
const SettingsController = require('express').Router();
const SettingsService = require('./settings.service');

//Get All Documents
SettingsController.get('/', SettingsService.FetchAllSettingsService)

//Get Settings By ID
SettingsController.get('/:id', SettingsService.FetchSingleSettingsService)


//Create Settings
SettingsController.post('/', SettingsService.CreateSettingsService)


//UpdateSettings by ID
SettingsController.patch('/:id', SettingsService.UpdateSettingsService)

//DeleteAllSettings
SettingsController.delete('/', SettingsService.DeleteAllSettingsService)

//DelectSettings by Id
SettingsController.delete('/:id', SettingsService.DeleteSingleSettingsService)

module.exports = SettingsController;