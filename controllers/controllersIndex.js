const db = require('../util/dbConnection');
/* POST Login de usuarios y muestra de rol en base a rol_id introducido en base de datos
   Por id = 1 == Admin, id = 2 == User 
*/
const jwt = require('jsonwebtoken');

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
      role: rows[0].role_id === 1 ? 'admin' : 'user'
    };

    // Generar el token
    const token = jwt.sign({ userId: user.id }, 'tu_clave_secreta', { expiresIn: '1h' }); // Cambia 'tu_clave_secreta' por una clave segura

    return res.status(200).json({ message: 'Logeado correctamente', token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Error al logear' });
  }
}

exports.showManualsByCategoryForUser = async (req, res, next) => {
  const { userId } = req.user; // Aquí ahora debería funcionar
  const manualCategorieId = req.query.manual_categorie_id; // Obtener la categoría desde los query parameters
  const page = parseInt(req.query.page) || 1; // Página actual, por defecto 1
  const limit = parseInt(req.query.limit) || 10; // Límites por página, por defecto 10
  const offset = (page - 1) * limit; // Calcular el desplazamiento

  if (!manualCategorieId) {
      return res.status(400).json({ message: 'El parámetro manual_categorie_id es necesario' });
  }

  try {
      // Consulta para obtener los manuales y el total de manuales
      const [manuals] = await db.execute(
          `SELECT m.*, 
                 (SELECT COUNT(*) 
                  FROM manualscontent 
                  WHERE user_type_id = ? AND manual_categorie_id = ?) AS totalManuals
           FROM manualscontent m
           WHERE m.user_type_id = ? AND m.manual_categorie_id = ?
           LIMIT ? OFFSET ?`,
          [userId, manualCategorieId, userId, manualCategorieId, limit, offset]
      );

      // Obtener el total de manuales
      const totalManuals = manuals.length > 0 ? manuals[0].totalManuals : 0;

      return res.status(200).json({
          message: 'Manuales obtenidos correctamente',
          manuals,
          pagination: {
              current_page: page,
              limit: limit,
              total_manuals: totalManuals, // Total de manuales
          }
      });
  } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Error al obtener manuales' });
  }
}
exports.getAllManualsCategories = async (req, res, next) => {
  try {
      const [categories] = await db.execute('SELECT * FROM manualcategories;');
      res.status(200).json(categories);
  } catch (e) {
      res.status(404).json(e);
  }
}