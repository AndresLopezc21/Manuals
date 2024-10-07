const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete CORS

const indexRoutes = require('./routes/routesIndex.js');

const app = express();

// Configura CORS para permitir solicitudes desde tu frontend
app.use(cors({
  origin: 'http://localhost:3001', // Permite solicitudes desde este origen (tu frontend)
  credentials: true // Si estás manejando cookies o autenticación basada en sesiones
}));

app.use(bodyParser.json()); //application/json

app.use('/index', indexRoutes);

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});