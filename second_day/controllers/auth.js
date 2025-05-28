const users = require("../models/User");

const signupController = async (req, res) => {
    console.log("Signup controller called");
    
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        res.status(403).send('Email and Password are required');
        return;
    }

    const id = Math.floor(Math.random() * 1000);

    // TODO: check if the user email is already present or not
    users.push({
        id,
        email,
        password,
    });
    
    res.status(200).json({
        id
    });
    // res.send('This is for signup');
    
}

const loginController = async (req, res) => {
    console.log("Login controller called");

    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        res.status(403).send('Email and Password are required');
        return;
    }
    const user = users.find(item => item.email == email);
    
    if(!user){
        res.status(404).send('User not found');
        return;
    }

    if(user.password !== password){
        res.status(401).send('Incorrect password');
        return;
    }
    res.status(200).json(user);
}


const getUserController = (req, res) => {
    const id = req.params.id;
    console.log("id:", id);

    if(!id){
        res.status(403).send('User Id is required');
        return;
    }

    const user = users.find(item => item.id == id);
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