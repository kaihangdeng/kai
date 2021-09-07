const mongoose = require('mongoose');
let doctorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            
        }
    },
    dateOfBirth:Date,
    address:{
        state:{
            type: String,
            validate:{
                validator:function(addressValue){
                    return addressValue.length >=2 && addressValue.length <=3;
                }
            }
        },
        suburb: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        unit: {
            type: String,
            required: true
        }
    },
    numPatients:{
        type: Number,
        validate:{
            validator:function(numPatientsValue){
                numPatientsValue >=0;
            },
            message: 'numPatients should be a number greater than 0'
        }

    }

});
module.exports = mongoose.model('Doctor', doctorSchema);