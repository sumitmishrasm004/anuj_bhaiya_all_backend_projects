const mongoose = require("mongoose");
const User = require("./models/User");

const mongoUri = "mongodb+srv://sumitmishra:sumitmishra@cluster0.11ikk.mongodb.net/?retryWrites=true&w=majority";

  try {

    mongoose.connect(
        mongoUri,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        () => {
          console.log("mongoDB connected");
        }
      );
      
  } catch (error) {
    console.log("error:", error);
  }

//   const user = new User({
//     email : "amitt@gmail.com",
//     password : "1234",
//   });

//   user.save().then((data) => {
//     console.log('User added in DB', data);
//   }).catch((error) => console.log(error));


async function createUser(newUser) {
    const user = User(newUser); // in memory user document created

    const data = await user.save(); // user saved inside database

    console.log('user : ', user);

    console.log('data :', data);
}

//  createUser({
//     email: "amit@gmail.com",
//     password : "12345",
//     marks: 28,
//  });

async function findUsers() {
    const users = await User.find();
    console.log('users : ', users);
}

async function findOneUser(data){
    const user = await User.findOne(data);
    console.log('user', user);
}

async function findById(id){
    const user = await User.findById(id);
    console.log('user by id', user);
    return user;
}

async function findUserByEmail(email){
    const user = await User.find({ email });  // here instead of writting {email : email} we use destructuring { email }
    console.log('user find by email :', user);
}

async function findUserByMarks(){
    // const users = await User.find({ marks : 48 });

    // const users = await User.find({ marks : { $gt : 48 } });

    // const users = await User.find({ marks : { $gte : 48 } });

    // const users = await User.find({ marks : { $lt : 48 } });

    const users = await User.find({ marks : { $lte : 48 } });

    console.log('user find by marks', users);
}

async function findUserByRegex(){
    const users = await User.find({ email : { $regex : "mi" } });

    console.log('users :', users);
}

async function updateMarks(userID, marks){
    const user = await findById(userID);
    user.marks = marks;
    const updatedUser = await user.save();
    console.log('updatedUser ', updatedUser);
}

// async function updateUser(userID, newUserData){
//     const user = await findById(userID);
//     user = newUserData; // This will not work
//     const updatedUser = await user.save();
//     console.log('updatedUser', updateUser);
// }

async function deleteUser(userID) {
    const user = await User.findById(userID);
    if(!user) return;
    const id = await user.delete();  // not need to use await here
    // console.log('id :', id);
}

deleteUser('657db0aff2c074560463bad4');

// updateUser('657dca857e77c8b0e172c8a8', {
//     email : "devsingh@gmail.com",
//     password : "2345",
//     marks : 25,
// });

// updateMarks("657dca857e77c8b0e172c8a8", 55);

// findUserByRegex();

// findUserByMarks();

// findUserByEmail('sumit@gmail.com');


// findUsers();

// findOneUser({email : 'sumit@gmail.com'});

// findById("657d4b2a30c309f4076c64de");


// require('./config/database').connect();