var express = require('express');
var router = express.Router();
const { connection } = require('../database/conexion.js')

router.get('/', function (req, res, next) {
    connection.query('SELECT cm.id,cm.fecha, cm.id_paciente, pac.nombre AS paciente, pac.apellido AS apellidoPaciente, med.nombre , med.apellido, med.consultorio FROM cita_medica cm, medicos med, pacientes pac WHERE cm.id_paciente = pac.cedula AND cm.id_medico = med.cedula', (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            res.render('citas', { 
                title: 'Citas', 
                citas: results,
                subtitulo: 'LISTADO CITAS'
            })
        }
    });
});


router.get('/agregar-cita', function (req, res, next) {   
    connection.query('SELECT cedula AS cedulaPaciente FROM pacientes', (error, pacientes) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            connection.query('SELECT especialidad FROM medicos', (error, especialidades) => {
                if (error) {
                    console.log("Error en la consulta", error)
                    res.status(500).send("Error en la consulta")
                } else {
                    res.render('registro-citas', { 
                        title: 'Citas', 
                        pacientes: pacientes,
                        medicos: especialidades,
                        subtitulo: 'AGENDAR CITA MEDICA'
                    })
                }
            });
        }
    });
});


//agregar cita
router.post('/agregar', function (req, res, next) {
    const cedulaPaciente = req.body.cedulaPaciente;
    const fecha = req.body.fecha;
    const especialidad = req.body.especialidad;
    connection.query(`SELECT cedula FROM medicos WHERE especialidad='${especialidad}'`, (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            let cedulaMedico = results[0].cedula
            connection.query(`INSERT INTO cita_medica (id_paciente, id_medico, fecha) VALUES (${cedulaPaciente},${cedulaMedico}, '${fecha}')`, (error, result) => {
                if (error) {
                    console.log("Ocurrio un error en la ejecución", error)
                    res.status(500).send("Error en la consulta");
                } else {
                    res.redirect('/citas');
                }
            });
        }
    });
})
//eliminar citas
router.get('/eliminar/:id', function (req, res, next) {
    const id = req.params.id
    connection.query(`DELETE FROM cita_medica WHERE id=${id}`, (error, results) => {
        if (error) {
            console.log("Error en la consulta", error)
            res.status(500).send("Error en la consulta")
        } else {
            res.redirect('/citas')
        }
    });
});


module.exports = router;