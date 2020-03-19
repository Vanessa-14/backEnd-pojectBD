const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

let Schema = mongoose.Schema;

let customerSchema = new Schema({
    // _id: {
    //     type: String,
    //     required: [false, 'Por favor ingresa el address']
    // },
    Address: {
        type: String,
        required: [true, 'Por favor ingresa el address']
    },
    City: {
        type: String,
        required: [true, 'Por favor ingresa la city']
    },
    Country: {
        type: String,
        required: [true, 'Por favor ingresa el country']
    },
    District: {
        type: String,
        required: [true, 'Por favor ingresa el district']
    },
    First_Name: {
        type: String,
        required: [true, 'Por favor ingresa el nombre']
    },
    Last_Name: {
        type: String,
        required: [true, 'Por favor ingresa el apellido']
    },
    Status: {
        type: Boolean,
        default: true
    }
});

customerSchema.plugin(autoIncrement.plugin, {
    model: '_id',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

customerSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Customer', customerSchema);