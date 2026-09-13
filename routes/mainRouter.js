const { Router } = require('express');
const mainController = require('../controllers/mainController');

const mainRouter = Router();

mainRouter.get('/', mainController.getIndex);
mainRouter.get('/create', mainController.getCreate);
mainRouter.get('/details/:weaponId', mainController.getDetails);
mainRouter.post('/create', mainController.postCreate);
module.exports = mainRouter;
