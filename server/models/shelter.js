const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shelterSchema = new Schema({
    poi: {
        name: String,
        url: String,
        phone: String
    },
    address: {
        street: String,
        city: String,
        state: String,
        freeformAddress: String
    },
    location: {
        type: { type: String },
        coordinates: []
    },
    id: String,
    dist: Number
})

shelterSchema.index({ location: "2dsphere" })
const Shelter = mongoose.model('Shelter', shelterSchema);

module.exports = Shelter;