const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});
const postRouter = require('./routes/post');
const authRouter = require('./routes/auth');
const mainRouter = require('./routes/index');
const app = express();

app.use(express.json());

// middleware without using path
// app.use((req, res, next) => {
//     console.log(req.method, req.url, new Date().toTimeString());
//     next();
// });

// middleware with path
// app.use('/api/auth/', (req, res, next) => {
//     console.log(req.method, req.url, new Date().toTimeString());
//     next();
// });

// middleware checks whether user is authenticated then only allow it to move further else return response from middleware 
// app.use((req,res, next) => {
//     console.log(req.method, req.url, new Date().toTimeString());
//     // We can also check whether user is authenticated with correct token or not
//     if(req.body && req.body.name == 'Sumit'){
//         next();
//     } else {
//         res.send("You are not allowed");
//     }
// })

app.use('/api' , mainRouter);

const PORT = process.env.PORT || 4100;

console.log(process.env.SECRET_API_KEY);

app.get("/", (req, res) => {
    res.send({
        data : "ok",
    });
});



app.listen(PORT, () => {
    console.log("App is running on PORT: ", PORT);
});

