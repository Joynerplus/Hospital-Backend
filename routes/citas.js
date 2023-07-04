var express = require('express');
var router = express.Router();
const { connection } = require('../database/conexion.js')

router.get('/', function (req, res, next) {
    connection.query('SELECT cm.id,cm.fecha, cm.id_paciente, pac.nombre AS paciente, med.nombre , med.apellido, med.consultorio FROM cita_medica cm, medicos med, pacientes pac WHERE cm.id_paciente = pac.cedula AND cm.id_medico = med.cedula', (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            res.render('citas', { title: 'Citas', citas: results })
        }
    });
});



module.exports = router;