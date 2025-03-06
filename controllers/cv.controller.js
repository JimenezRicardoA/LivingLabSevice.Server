const bcrypt = require('bcryptjs');

const {
    cvModel
} = require('../models/cv.model.js');

async function createCv(req, res) {
    try {
        const {
            paginaweb,
            sobremi,
            habilidades,
            idiomas,
            formacion
        } = req.body;

        if (!sobremi) {
            return res.status(400).json({
                message: 'Es obligatorio llenar el campo Sobre mi'
            });
        } else if (!habilidades) {
            return res.status(400).json({
                message: 'Es obligatorio llenar el campo de habilidades'
            });
        } else if (!idiomas) {
            return res.status(400).json({
                message: 'Es obligatorio llenar el campo de idiomas'
            });
        } else if (!formacion) {
            return res.status(400).json({
                message: 'Es obligatorio llenar el campo de formacion'
            });
        }

        const cv = new cvModel({
            paginaweb,
            sobremi,
            habilidades,
            idiomas,
            formacion
        });

        await cv.save();

        res.status(200).json({
            message: 'CV creado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor',
            error: error.message
        });
    }
}

module.exports = {
    createCv
}