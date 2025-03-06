const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    aplicantesModel
} = require('../models/apservicio.model');

const JWT_SECRET = 'clave';

async function signup(req, res) {
    try {
        const { nombres, apellidos, telefono, correo, /*universidad, carrera, cv, sobremi,*/ username, password } = req.body;

        if (!nombres || !apellidos || !telefono || !correo || /*!universidad || !carrera || !cv || !sobremi ||*/ !username || !password) {
            return res.status(400).json({
                message: 'Todos los campos son requeridos'
            });
        }

        const existingusername = await aplicantesModel.findOne({ username });
        if (existingusername) {
            return res.status(400).json({
                message: 'El usuario ya existe'
            });
        }

        const existingcorreo = await aplicantesModel.findOne({ correo });
        if (existingcorreo) {
            return res.status(400).json({
                message: 'Este correo ya se encuentra registrado'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newaplicante = new aplicantesModel({
            nombres,
            apellidos,
            telefono,
            correo,
            //universidad,
            //carrera,
            //cv,
            //sobremi,
            username,
            password: hashedPassword
        });

        await newaplicante.save();

        res.status(201).json({
            message: 'Aplicante creado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor',
            error: error.message
        });
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: 'Todos los campos son requeridos'
            });
        }

        const aplicante = await aplicantesModel.findOne({ username });

        if (!aplicante) {
            return res.status(400).json({
                message: 'El usuario no existe'
            });
        }

        const isMatch = await bcrypt.compare(password, aplicante.password);

        if (!isMatch) {
            return res.status(400).json({
                message: 'Credenciales incorrectas'
            });
        }

        const token = jwt.sign(
            { userId: aplicante._id, username: aplicante.username, email: aplicante.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Bienvenido',
            token
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor',
            error: error.message
        });
    }
}

module.exports = {
    signup,
    login
};