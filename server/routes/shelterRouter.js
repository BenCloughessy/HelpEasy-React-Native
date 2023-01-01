const express = require('express');
const Shelter = require('../models/shelter');

const shelterRouter = express.Router();

shelterRouter.route('/')
.get((req, res, next) => {
    Shelter.find()
    .then(shelters => {
        console.log(shelters)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(shelters);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Shelter.create(req.body)
    .then(shelter => {
        console.log('Shelter Created ', shelter);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(shelter);
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

shelterRouter.route('/:longitude/:latitude')
.get((req, res, next) => {
    console.log([req.params.longitude, req.params.latitude])
    Shelter.find(
        {
            location:
                { $near:
                {
                    $geometry: { type: 'Point', coordinates: [req.params.longitude, req.params.latitude] },
                    $maxDistance: 20000
                }
            }
        }
    )
    .then(shelters => {
        console.log(shelters)
        for (let i = 0; i < shelters.length; i++) {
            shelters[i].id = shelters[i]._id
        }
        console.log(shelters)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(shelters);
    })
    .catch(err => next(err));
})


module.exports = shelterRouter;