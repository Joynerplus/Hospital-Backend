var express = require('express');
var router = express.Router();
const { connection } = require('../database/conexion.js')

router.get('/', function(req, res, next) {
    res.render('pacientes', { 
    title: 'Pacientes',  
    botonAgregar: 'agregar pacientes'        
    });
  });
module.exports = router;