const { Router } = require('express');
const mainController = require('../controllers/mainController');

const mainRouter = Router();

mainRouter.get('/', mainController.getIndex);
mainRouter.get('/create', mainController.getCreate);
mainRouter.get('/details/:weaponId', mainController.getDetails);
mainRouter.post('/create', mainController.postCreate);
mainRouter.get('/edit-weapon/:weaponId', mainController.getEdit);
mainRouter.post('/edit-weapon/:weaponId', mainController.updateEdit);
mainRouter.delete('/delete/:weaponId', mainController.deleteWeapon);
module.exports = mainRouter;
