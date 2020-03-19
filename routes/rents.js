const express = require('express');
const Rent = require('../models/rents');
const app = express();


app.post('/rent', (req, res) => {
    let body = req.body;
    let rent = new Rent({
        codigoCustomer: body.codigoCustomer,
        codigoLisre: body.codigoLisre
    });

    rent.save((err, renDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            renDB
        });
    });
});

app.get('/rent', (req, res) => {
    Rent.find({ Status: true })
        .populate('codigoCustomer')
        .populate('codigoLisre')
        .exec((err, rents) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: rents.length,
                rents
            });
        });
});



app.put('/rent/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['codigoCustomer', 'codigoLisre']);
    Rent.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, renDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            renDB
        });

    });
});

app.delete('/rent/:id', (req, res) => {
    let id = req.params.id;
    Rent.findByIdAndUpdate(id, { Status: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});

module.exports = app;