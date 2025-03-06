const mongoose = require('mongoose');

const apservicioSchema = mongoose.Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
});

const aplicantesModel = mongoose.model('aplicantes', apservicioSchema);

module.exports = {
    aplicantesModel
}