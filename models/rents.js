const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
//const autoIncrement = require('mongoose-auto-increment');

//autoIncrement.initialize(mongoose);

let Schema = mongoose.Schema;

let rentSchema = new Schema({

    codigoCustomer: {
        type: Schema.Types.String,
        ref: 'Customer',
        required: [true, 'Ingresar el codigo de customer']
    },
    codigoLisre: {
        type: Schema.Types.String,
        ref: 'listingsAndReviews',
        required: [true, 'Ingresar el codigo de lyr']
    },
    Status: {
        type: Boolean,
        default: true
    }

});

// rentSchema.plugin(autoIncrement.plugin, {
//     model: '_id',
//     field: '_id',
//     startAt: 1,
//     incrementBy: 1
// });

rentSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('Rent', rentSchema);