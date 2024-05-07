require('dotenv').config();
const express = require('express');

const PrimaryRoute = require('./routes/Primary');
const StatusRoute = require('./routes/Status');
// const QueryRoute = require('./routes/Query');


const { useLogger } = require('./models/Logger');

// Create Server
const app = express();

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger
app.use(useLogger);

// Routes
// app.use('/query', QueryRoute);
app.use('/status', StatusRoute);
app.use('/', PrimaryRoute);

// Bind to Port and Run
const server = app.listen(process.env.APP_PORT, () => {
    console.log(`Log Service HOST: ${server.address().address}`);
    console.log(`Log Service PORT: ${server.address().port} • ${process.env.APP_PORT}`);
    console.log(`Log Service VERSION: ${process.env.APP_VERSION}`);
})
console.log(`Log Service RUNNING • `)
