const express = require('express');
//


const indexController = require('../controllers/controllersIndex');
const authenticateUser = require('../middlewares/authenticateUser');

const router = express.Router();

router.post('/login', indexController.loginUser);

router.get('/manuals-by-categorie',authenticateUser, indexController.showManualsByCategoryForUser);

router.get('/manuals-categories', indexController.getAllManualsCategories);

module.exports = router;