const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    first_name:{
        type:String,
        require:true
    },
    last_name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true,
        uique:true
    },

})
const Employeedb = mongoose.model('employeedb', schema);

module.exports = Employeedb;

