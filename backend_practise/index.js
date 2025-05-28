// const util = require('./app');
// // const {multiply} = require('./app');
// // const value = util(2,3);

//  const value1 = util.multiply(2,3);
//  const value2 = util.log.error("this is error");
//  const value3 = util.log.warning("this is warning");
//  console.log(value1);
//  console.log(value2);
//  console.log(value3);



const express = require('express');
// const PORT = require('dotenv');

const app = express();

app.get("/", (req,res) => {
    // res.sendFile(__dirname + "/index.html");
    res.json({
        "success" : true,
    })
})

app.get("/user", (req, res) => {
    console.log("User was called");
    // res.send("Hello User");
    res.send({
        "name" : "Sumit",
        "roll no": 24,
    })
})

app.listen(4000, () => {
    console.log("Listening on PORT 4000");
})