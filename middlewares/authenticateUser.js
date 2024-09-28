const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization']; // Suponiendo que el token se pasa en la cabecera Authorization

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token' });
  }

  jwt.verify(token.split(' ')[1], 'tu_clave_secreta', (err, decoded) => { // Asegúrate de dividir el "Bearer"
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }
    
    req.user = { userId: decoded.userId }; // Guardar el userId en req.user
    next();
  });
};

module.exports = authenticateUser;