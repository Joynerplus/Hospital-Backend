var express = require('express');
var router = express.Router();
const { connection } = require('../database/conexion.js')

router.get('/', function(req, res, next) {
  res.render('medicos', { 
    title: 'Medicos', 
    subtitulo: 'LISTADO DE MEDICOS',
    botonAgregar: 'agregar medicos'
    
  });
});



module.exports = router;
