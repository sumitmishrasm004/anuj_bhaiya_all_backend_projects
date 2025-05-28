// const user = [
//     {
//         id : '1234',
//         email : "sumit@gmail.com",
//         password: "2345",
//     },
//     {
//         id : '2455',
//         email : "amit@gmail.com",
//         password: "4545",
//     },
// ];


const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type : String,
        required : true,
        unique : true,
        // dropDups : true,
        
    },
    password: String,
    marks : {
        type : Number,
        default : 0,
    },
}, {
    timestamps : true,
});


module.exports = mongoose.model('user', userSchema);