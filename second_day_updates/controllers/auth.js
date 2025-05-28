const User = require("../models/User");

const signupController = async (req, res) => {
    console.log("Signup controller called");
    
   try {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        res.status(403).send('Email and Password are required');
        return;
    }

    // const id = Math.floor(Math.random() * 1000);

    // TODO: check if the user email is already present or not

    const user = await User.findOne({email});
    if(user){
        res.status(403).send('User already exists');
        return;
    }
    
    const newUser = new User({email, password});
    await newUser.save();
    
    res.status(200).json(newUser);
   } catch (error) {
    console.log('error', error.message);
    res.status(500).send('Error: ' + error.message);
   }
    // res.send('This is for signup');
    
}

const loginController = async (req, res) => {
    console.log("Login controller called");

   try {
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        res.status(403).send('Email and Password are required');
        return;
    }
    // const user = users.find(item => item.email == email);

    const user = await User.findOne({email});
    
    if(!user){
        res.status(404).send('User not found');
        return;
    }

    if(user.password !== password){
        res.status(401).send('Incorrect password');
        return;
    }
    res.status(200).json({
        email : user.email,
    });
   } catch (error) {
    console.log('error', error.message);
   }
}


const getUserController = async (req, res) => {
    const id = req.params.id;
    console.log('req.url', req.url);
    console.log("id:", id);

    if(!id){
        res.status(403).send('User Id is required');
        return;
    }

    // const user = users.find(item => item.id == id);
    const user = await User.findById(id);
    if(!user) {
    res.status(404).send('User not found');
    return;
 }
 res.status(200).json(user);
}

module.exports = {
    signupController,
    loginController,
    getUserController,
}