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
    connection.query(`INSERT INTO pacientes (cedula,nombre,apellido,edad,telefono) VALUES ('${cedulaPaciente}','${nombrePaciente}','${apellidoPaciente}','${edadPaciente}','${telefonoPaciente}');`, (error, results) => {
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




//modificar
router.get('/enviar/:clave', function (req, res, next) {
    const clave = req.params.clave;
    connection.query('SELECT * FROM pacientes', (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            res.render('pacientes', { 
                title: 'pacientes',
                subtitulo: 'EDITAR PACIENTE',
                claveSeleccionada: clave, 
                pacientes: results, 
                opcion: 'disabled', 
                estado: false })
        }
    });
});
router.post('/actualizar/:cedula', (req, res) => {
    const cedulaPaciente = req.params.cedula;
    const nombrePaciente = req.body.nombrePaciente;
    const apellidoPaciente = req.body.apellidoPaciente;
    const edadPaciente = req.body.edadPaciente;
    const telefonoPaciente = req.body.telefonoPaciente;
    console.log("request", req.body)

    connection.query(`UPDATE pacientes SET nombre='${nombrePaciente}', apellido='${apellidoPaciente}', edad='${edadPaciente}', telefono='${telefonoPaciente}' WHERE cedula='${cedulaPaciente}'`, (error, result) => {
        if (error) {
            console.log("Ocurrió un error en la ejecución", error);
            res.status(500).send("Error en la consulta");
        } else {
            res.redirect('/pacientes');
        }
    });
});




module.exports = router;