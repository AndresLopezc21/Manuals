const express = require('express');
const bodyParser = require('body-parser');


const indexRoutes = require('./routes/routesIndex.js');

const app = express();

app.use(bodyParser.json()); //application/json

app.use('/index', indexRoutes);

app.listen(3000);