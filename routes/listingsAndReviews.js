const express = require('express');
const ListingsAndReview = require('../models/listingsAndReviews');
const app = express();

app.get('/listingsAndReview', (req, res) => {
    ListingsAndReview.find({ Status: true })
        .exec((err, listingsAndReviews) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: listingsAndReviews.length,
                listingsAndReviews
            });
        });
});

app.get('/listingsAndReviewaPrice', (req, res) => {
    ListingsAndReview.find({ $and: [{ "price": { $gte: 80 } }, { "price": { $lte: 5000 } }] })
        .exec((err, listingsAndReviews) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: listingsAndReviews.length,
                listingsAndReviews
            });
        });
});

app.get('/listingsAndReview/:property', (req, res) => {
    let property = req.params.property
    ListingsAndReview.find({ property_type: property })
        .exec((err, listingsAndReviews) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: listingsAndReviews.length,
                listingsAndReviews
            });
        });
});

app.post('/listingsAndReview', (req, res) => {
    let body = req.body;
    let listingsAndReview = new ListingsAndReview({
        name: body.name,
        description: body.description,
        property_type: body.property_type,
        price: body.price
    });

    listingsAndReview.save((err, larDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            larDB
        });
    });
});

app.put('/listingsAndReview/:id', (req, res) => {
    let id = req.params._id;
    let body = _.pick(req.body, ['name', 'description', 'property_type', 'price']);
    ListingsAndReview.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, larDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            larDB
        });

    });
});

app.delete('/listingsAndReview/:id', (req, res) => {
    let id = req.params.id;
    ListingsAndReview.findByIdAndUpdate(id, { Status: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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