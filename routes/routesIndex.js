const express = require('express');
//


const indexController = require('../controllers/controllersIndex');

const router = express.Router();

// GET /Obtener todas las categorias de los Manuales
router.get('/getManualsCategories', indexController.getAllManualsCategories);

// GET /Obtener una descripción completa de la tarea a consultar
router.get('/getCategoryContentById/:id', indexController.getManualsByCategorieId);


//POST /Registrar todos los datos de la tarea
router.post('/login', indexController.loginUser);

/*
// PUT /Permite editar una row seleccionada con su id
router.put('/updateTask/:id', indexController.editRow);

// DELETE /Permite borrar una row seleccionada con su id
router.delete('/deleteTask/:id', indexController.deleteRow);*/
module.exports = router;