const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // mongoose imports MongoDB by default so there's no need to import it separately

const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', employeesRoutes);
app.use('/api', departmentsRoutes);
app.use('/api', productsRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})

// connects our backend code with the database
const NODE_ENV = process.env.NODE_ENV;
let dbUrl = '';

if(NODE_ENV === 'production') dbUrl = 'url to remote db';
else if(NODE_ENV === 'test') dbUrl = 'mongodb://localhost:27017/companyDBtest';
else dbUrl = 'mongodb://localhost:27017/companyDB';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }); // connection to server is automatically assigned to 'mongoose.connection' object, which is available everywhere
const db = mongoose.connection;

db.once('open', () => {
  // console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen('8000', () => {
  // console.log('Server is running on port: 8000');
});

module.exports = server;
