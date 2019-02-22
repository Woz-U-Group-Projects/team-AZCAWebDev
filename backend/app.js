const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

const app = express();

//database connection
mongoose.connect('mongodb+srv://AZCA-Admin:9nDMG8jtVxjyGu8@azca-chat-iik3v.mongodb.net/azca-chat?retryWrites=true')
  .then(() => {
    console.log('Connected to database!')
})
  .catch(() => {
    console.log('Connection failed!')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/posts', postsRoutes);

module.exports = app;
