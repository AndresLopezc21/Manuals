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
/* POST Login de usuarios y muestra de rol en base a rol_id introducido en base de datos
   Por id = 1 == Admin, id = 2 == User 
*/
exports.loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ message: 'El username y password son necesarios para iniciar sesión' });
  }

  try {
      const [rows] = await db.execute(
          `SELECT * FROM users WHERE username = ? AND password = ?`,
          [username, password]
      );

      if (rows.length === 0) {
          return res.status(401).json({ message: 'Username o password invalido' });
      }
      
      const user = {
          id: rows[0].id,
          username: rows[0].username,
          role: rows[0].role_id === 1 ? 'admin' : 'user' // Asignar el rol
      };

      return res.status(200).json({ message: 'Logeado correctamente', user });
  } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error al logear' });
  }
}
/*
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