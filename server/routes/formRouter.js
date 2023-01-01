const express = require('express');
const Form = require('../models/requestForm');
const formRouter = express.Router();

formRouter.route('/')
.get((req, res, next) => {
    Form.find()
    .then(forms => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(forms);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Form.create(req.body)
    .then(form => {
        console.log('Form Created ', form);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(form);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported');
})
.delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported');
});

formRouter.route('/:formId')
.delete((req, res) => {
    Form.findByIdAndDelete(req.params.formId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
})


module.exports = formRouter;