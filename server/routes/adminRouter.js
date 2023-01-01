const express = require('express');
const adminRouter = express.Router();

adminRouter.route('/')
.get((req, res, next) => {
    Form.find()
    .then(forms => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(forms);
    })
    .catch(err => next(err));
})

adminRouter.route('/home')
.get((req, res, next) => {
    Form.find()
    .then(forms => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(forms);
    })
    .catch(err => next(err));
})


module.exports = formRouter;