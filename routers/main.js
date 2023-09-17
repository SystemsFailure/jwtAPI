const router = require('express').Router();
const UserController = require('../controllers/main');
const userController = new UserController();

router.post('/register', userController.regis);
router.post('/login', userController.login);
router.patch('/logout', userController.logout);
router.post('/refreshToken', userController.refreshToken);


module.exports = router;