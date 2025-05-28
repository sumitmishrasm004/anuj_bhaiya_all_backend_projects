// const mongoose = require('mongoose');
// const mongoUri = "mongodb+srv://sumit:sumit@cluster0.11ikk.mongodb.net/?retryWrites=true&w=majority";
// // require('dotenv').config();

// exports.connect = async () => {
//     mongoose.connect(mongoUri, {
//         useNewUrlParser:true,
//         useUnifiedTopology:true,
//     })
//     .then(() => console.log("DB connected successfully"))
//     .catch((error) =>{ 
//         console.log(`Error in connecting Database and error is ${error}`);
//         console.error(error);
//         process.exit(1);
//     })
// };