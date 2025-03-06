require('dotenv').config();

const variablesDeConfiguracion = {
    mongoURL: process.env.MONGODB_URI
}

module.exports = {
    variablesDeConfiguracion
}