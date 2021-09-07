const mongoose = require('mongoose');
let patientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name :{
        type: String,
        require: true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'doctor'
    },
    age: {
        type: Number,
        validate: {
            validator: function (ageValue) {
                return ageValue >= 0 && ageValue <= 120;
            },
            message: 'Age should be a number between 0 and 120'
        }
    },
    dateOfVisit: {
        type: Date,
        default: Date.now
    },
    caseDescription:{
        type: String,
        validate:{
            validator:function(value) {
                return value.length >=10;
            }
        }
    }


});
module.exports = mongoose.model('patient', patientSchema);