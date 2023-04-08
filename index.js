require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const PrimaryRoute = require('./routes/Primary');
const { useLogger } = require('./models/Logger');

// Create Server
const app = express();

// Parsers
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Logger
app.use(useLogger);

// Routes
app.use('/', PrimaryRoute);

// Bind to Port and Run
const server = app.listen(process.env.APP_PORT, () => {
    console.log(`Log Service HOST: ${server.address().address}`);
    console.log(`Log Service PORT: ${server.address().port} • ${process.env.APP_PORT}`);
    console.log(`Log Service VERSION: ${process.env.APP_VERSION}`);
})
console.log(`Log Service RUNNING • `)
