const express = require('express');
const Customer = require('../models/customers');
const app = express();

//obetener customers
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

//obtener customers por id
app.get('/customer/:id', (req, res) => {
    Customer.find({ "_id": req.params.id })
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

//obtener customers por nombre
app.get('/customer/name/:name', (req, res) => {
    let name = req.params.name;
    Customer.find({ Status: true, First_Name: name })
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

//obtener customers por país
app.get('/customer/Country/:pais', (req, res) => {
    let pais = req.params.pais;
    Customer.find({ Status: true, Country: pais })
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

//agregar customers
app.post('/customer', (req, res) => {
    let body = req.body;
    let customer = new Customer({
        _id: body._id,
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

//actualizar customers por id
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

//eliminar o desactivar customer por id
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

// app.delete('/customer/name/:First_Name', (req, res) => {
//     let First_Name = req.params.First_Name;
//     Customer.findByIdAndUpdate(First_Name, { Status: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         }
//         return res.status(200).json({
//             ok: true,
//             resp
//         });
//     });
// });

module.exports = app;