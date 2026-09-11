const { Router } = require('express');
const mainController = require('../controllers/mainController');

const mainRouter = Router();

mainRouter.get('/', mainController.getIndex);
module.exports = mainRouter;
