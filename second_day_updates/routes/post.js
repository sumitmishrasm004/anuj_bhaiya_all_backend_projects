const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        id: '1234',
        title: 'hello',
        imgUrl: 'sfffd',
    });
});

router.post('/', (req,res) => {
    res.json({
        status: true,
    })
});

router.get('/all', (req,res) => {
    res.json({
        data: [
            {
                title : "Hello",
            },
            {
                title : "Hi",
            },
        ]
    })
})


module.exports = router;