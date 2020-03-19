require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(require('./routes/customers'));
app.use(require('./routes/listingsAndReviews'));
app.use(require('./routes/rents'));

mongoose.connect('mongodb://localhost:27017/sample_airbnb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    (err, resp) => {
        if (err) throw err;

        console.log('Base de datos ONLINE');
    });

app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto 3000 ', process.env.PORT);
});