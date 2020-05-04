require('dotenv').config()

const express = require('express');
const logger=require('./logger');
const bodyParser = require('body-parser');

const app = express(); // initialize an app
const routes = require('./routes');
const cors = require('cors');
app.use(bodyParser.json()); // parse json

const port = 8000;



app.use(cors());
app.use('/', routes);
app.use('/upload', routes);


app.use((error, req, res, next) => {
    res.json({
        success: false,
        error,
    })
});

app.listen(port, (error) => {
    if (error) {
        logger.log(error);
    } else {
        logger.log('info',`Server started on port ${port}`);
    }
})