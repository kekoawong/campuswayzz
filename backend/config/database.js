/* database config file */
const mongoose = require('mongoose');

/* import environment variables */
const username = process.env.MONGOATLAS_USERNAME;
const password = process.env.MONGOATLAS_PASSWORD;
const cluster = process.env.MONGOATLAS_CLUSTER;

const databaseUrl = 'mongodb+srv://' + username + ':' + password + cluster;
console.log('Backend: database url = ' + databaseUrl);

/* connect to mongodb */
mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;

db.once('connected', () => {
    console.log('Backend: Connected to MongoDB ' + db.name + ' at ' + db.host + ': ' + db.port);
});