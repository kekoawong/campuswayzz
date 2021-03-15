/* server file */
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const backend_port = 5000;

app.use(express.json());

const routes = require('./routes/router'); // listen for router endpoints
app.use('/api', routes);

require('./config/database'); // connect to MongoDB

app.listen(backend_port, () => {
    console.log('Backend: Server is listening on port ' + backend_port);
});