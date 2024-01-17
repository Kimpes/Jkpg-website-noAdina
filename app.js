const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

const venues = require('./stores.json');

app.use(
    express.urlencoded({
      extended: false,
    })
);

//type this in the http client to test: http://localhost:8080/?storename=Akademibokhandeln
app.get('/', (req, res) => {
    const {storename} = req.query;
    const index = venues.findIndex(store => store.name === storename);
    if (index <= -1) {
        res.send("oops, silly");
    } else {
        res.send(`Index is ${index}`);
    }
    //res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log("hello i guess");
});