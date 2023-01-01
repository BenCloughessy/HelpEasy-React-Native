const mongoose = require('mongoose')
const Schema = mongoose.Schema

const formSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
})

const Form = mongoose.model('Form', formSchema);

module.exports = Form;