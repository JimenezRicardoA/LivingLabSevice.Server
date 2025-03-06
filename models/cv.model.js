const mongoose = require('mongoose');

const {
    aplicantesModel
} = require('./apservicio.model');

const lenguagesSchema = mongoose.Schema({
    lenguage: {
        type: String,
        required: true
    },
    nivel: {
        type: String,
        required: true
    }
});

const cvSchema = mongoose.Schema({
    paginaweb: {
        type: String,
        required: false
    },
    sobremi: {
        type: String,
        required: true
    },
    habilidades: {
        type: String,
        required: true
    },
    idiomas: [{
        idioma: {
            type: String,
            required: true
        },
        nivel: {
            type: String,
            required: true
        }
    }],
    formacion: [{
        institucion: {
            type: String,
            required: true
        },
        fechas: {
            type: String,
            required: true
        },
    }],
    lenguajesdeprogramacion: [lenguagesSchema]
});

const cvModel = mongoose.model('cv', cvSchema);

module.exports = {
    cvModel
}