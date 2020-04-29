const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get posts

router.get('/', (req, res) => {
    res.send('hello');
});

//Add posts



//Delete posts



async function loadPostsCollection() {
    const mongo = 'mongodb://127.0.0.1/posts';
}


module.exports = router;