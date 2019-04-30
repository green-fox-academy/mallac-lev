'use strict';

const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running, yay! Port ${PORT}`);
});

app.use(express.json());
app.use('/', express.static(__dirname + 'assets'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});