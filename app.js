const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

const venues = require('stores.json');

app.use(
    express.urlencoded({
      extended: false,
    })
);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log("hello i guess");
});