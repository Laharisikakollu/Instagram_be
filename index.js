const express = require('express');
const bodyParser = require('body-parser');

const app = express(); // initialize an app
const routes = require('./routes');
const cors = require('cors');
// var upload = multer({ dest: 'uploads/' })
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
        console.log(error);
    } else {
        console.log(`Server started on port ${port}`);
    }
})