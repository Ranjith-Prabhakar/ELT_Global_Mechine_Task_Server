const express = require('express');
const cors = require('cors');
const { user } = require('./api');


module.exports = async (app) => {

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({
    origin: "*"
  }));

  //api
  user(app);

  // error handling
  // app.use(HandleErrors);

}