require('dotenv').config();
const express = require('express');
const cors = require('cors');
const corsOptions = require('./utils/corsOptions')
const bodyParser = require('body-parser')
const routes = require('./routes');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();


// app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));


// app.use(express.json());
app.use('/api', routes)
const port = process.env.PORT || 8000;


app.listen(port, console.log("server is listening at port:", port));