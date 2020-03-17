const express = require('express');
const Customer = require('../models/customers');
const app = express();

app.get('/customer', (req, res) => {
    Customer.find({ Status: true })
        .exec((err, customers) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: customers.length,
                customers
            });
        });
});

app.post('/customer', (req, res) => {
    let body = req.body;
    let customer = new Customer({
        Address: body.Address,
        City: body.City,
        Country: body.Country,
        District: body.District,
        First_Name: body.First_Name,
        Last_Name: body.Last_Name,
        Status: body.Status,
    });

    customer.save((err, cusDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            cusDB
        });
    });
});

app.put('/customer/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['Address', 'City', 'Country', 'District', 'First_Name', 'Last_Name', 'Status']);
    Customer.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, cusDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            cusDB
        });

    });
});

app.delete('/customer/:id', (req, res) => {
    let id = req.params.id;
    Customer.findByIdAndUpdate(id, { Status: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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