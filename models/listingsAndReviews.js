const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let listingsAndReviewsSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Por favor ingresa el name']
    },
    description: {
        type: String,
        required: [true, 'Por favor ingresa la descripcion']
    },
    property_type: {
        type: String,
        required: [true, 'Por favor ingresa el property_type']
    },
    price: {
        type: Number,
        required: [true, 'Por favor ingresa el precio']
    },
    Status: {
        type: Boolean,
        default: true
    }
});
listingsAndReviewsSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

module.exports = mongoose.model('listingsAndReviews', listingsAndReviewsSchema);