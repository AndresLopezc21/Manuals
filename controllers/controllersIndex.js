const db = require('../util/dbConnection');

// GET /Muestra información sobre las categorias de manuales al momento disponibles

exports.getAllManualsCategories = async (req, res, next) => {
    req = await db.execute('SELECT * FROM manualcategories;')
      .then((res2) => {
        res.status(200).json(res2[0]);
      })
      .catch((e) => {
        res.status(404).json(e);
      });
}


// GET /Muestra información completa sobre un manual en base a su id de categoria

exports.getManualsByCategorieId = async (req, res, next) => {
    const categoryId = req.params.id; 
  
    await db.execute(`
            SELECT mcont.* 
                FROM manualscontent AS mcont
                JOIN manualcategories AS mcat ON mcont.manual_categorie_id = mcat.id
            WHERE mcat.id = ?`, [categoryId])
    .then((res2) => {
      res.status(200).json(res2[0]);
    })
    .catch((e) => {
      res.status(404).json(e);
    });
}
/*
// POST / Da de alta la tarea en la tabla dentro de la db 

exports.createPost = async (req, res, next) => {
  const newTarea = req.body;
  if (!newTarea.title || !newTarea.description || !newTarea.status || !newTarea.date) {
    res.status(400).send('Asegurate de ingresar los datos obligatorios (titulo, descripción, estatus y fecha)');
  }
  else {
    const title = newTarea.title;
    const description = newTarea.description;
    const status = newTarea.status;
    const date = newTarea.date;
    const comments = newTarea.comments;
    const responsibleOf = newTarea.responsibleOf;
    const tags = newTarea.tags;

    post: { title, description, status, date, comments, responsibleOf, tags }

    await db.execute(`INSERT INTO tareas (titulo, descripcion, status, fecha, comentarios, responsable, tags)
                             VALUES ('${title}', '${description}', '${status}',
                                     '${date}', '${comments}', '${responsibleOf}', '${tags}');`)
      .then((res2) => {
        res.status(200).json({
          message: 'La tarea se ha registrado correctamente',
        });
      })
      .catch((e) => {
        res.status(404).json(e);
      });
  }
}

// PUT / Permite editar a la tarea a seleccionar dando el id, solo no permite editar el responsable de la tarea

exports.editRow = async (req, res, next) => {
  const newValues = req.body;
  if (!newValues.title || !newValues.description || !newValues.status || !newValues.date) {
    res.status(400).send('Asegurate de ingresar los datos obligatorios (titulo, descripción, estatus y fecha)');
  }
  else {
    const title = newValues.title;
    const description = newValues.description;
    const status = newValues.status;
    const date = newValues.date;
    const comments = newValues.comments;
    const tags = newValues.tags;

    post: { title, description, status, date, comments, tags }

    await db.execute(`UPDATE tareas SET titulo = '${title}', descripcion = '${description}', status = '${status}',
                                      fecha = '${date}', comentarios = '${comments}', tags = '${tags}' 
                                  WHERE (id = ${req.params.id});`)
      .then((res2) => {
        res.status(200).json({
          message: 'Se modifico la tarea seleccionada correctamente'
        });
      })
      .catch((e) => {
        res.status(404).json(e);
      });

  }
}

// DELETE / Da de baja las tarea con el id que se le da 

exports.deleteRow = async (req, res, next) => {
  await db.execute(`DELETE FROM tareas WHERE id =${req.params.id};`)
    .then((res2) => {
      res.status(200).json({
        message: 'Se elimino la tarea con el id seleccionado correctamente'
      });
    })
    .catch((e) => {
      res.status(404).json(e);
    });

} */ 