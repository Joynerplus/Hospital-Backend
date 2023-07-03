var express = require('express');
var router = express.Router();
const { connection } = require('../database/conexion.js')


router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM pacientes', (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            res.render('pacientes', {
                title: 'Pacientes',
                subtitulo: 'LISTADO DE PACIENTES', medicos: results,
                pacientes: results, opcion:
                    'disabled', estado: true
            })

        }
    });
});


router.get('/agregar-paciente', function (req, res, next) {
    res.render('registro-pacientes');
});

//Agregar paciente
router.post('/agregar', (req, res) => {
    const cedulaPaciente = req.body.cedulaPaciente
    const nombrePaciente = req.body.nombrePaciente
    const apellidoPaciente =  req.body.apellidoPaciente
    const edadPaciente = req.body.edadPaciente
    const telefonoPaciente = req.body.telefonoPaciente
    connection.query(`INSERT INTO pacientes (cedula,nombre,apellido,edad,telefono) VALUES (${cedulaPaciente},'${nombrePaciente}','${apellidoPaciente}',${edadPaciente},${telefonoPaciente});`, (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            res.redirect('/pacientes')
        }
    });    
})

//Eliminar Pacientes
router.get('/eliminar/:cedula', function (req, res, next) {
    const cedula = req.params.cedula
    connection.query(`DELETE FROM cita_medica WHERE id_paciente=${cedula}`, (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            connection.query(`DELETE FROM pacientes WHERE cedula=${cedula}`, (error, results) => {
                if (error) {
                    console.log("Error en la consulta", error)
                    res.status(500).send("Error en la consulta")
                } else {
                    res.redirect('/pacientes')
                }
            });
        }
    });
});






module.exports = router;