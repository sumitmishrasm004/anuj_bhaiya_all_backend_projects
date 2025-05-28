const express = require('express');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000

app.use(express.json());

app.get('/', (req, res) => {
    console.log("Home page is called");
    res.send(" <h1>This is my serverr</h1>");
});

app.get('/user', (req, res) => {
    console.log("User page is called");
    res.json({
        "name" : "Sumit"
    });
});


app.post('/post', (req, res) => {
    const {title, description} = req.body;
    console.log("title", title, "description", description);
    res.json({
        name: "Sumit",
        rollNo: 23,
    });
});

app.post('/multiply', (req, res) => {
    try {
        const {a , b} = req.body;
    console.log("a", a, "b", b);

    res.status(200).json({
        success: true,
        multiplyValue: a * b,
        
    });
        
    } catch (error) {
        res.status(500).json({
            status: false,
            data : "internal server error",
            message: error.message,
        })
    }
    
});

app.post("/sum", (req, res) => {
    try {
        const {a, b} = req.body;
        console.log("a", a, "b", b);
        res.status(200).json({
            status : true,
            sum : a + b,
        });
    } catch (error) {
        res.status(500).json({
            status : false,
            data: "internal server error",
            message: error.message,
        })
    }
});

app.post("/average", (req, res) => {
    try {
        const {a, b} = req.body;
        console.log("a", a, "b", b);
        res.status(200).json({
            status : true,
            average : (a + b) / 2,
        });
    } catch (error) {
        res.status(500).json({
            status : false,
            data: "internal server error",
            message: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
})

