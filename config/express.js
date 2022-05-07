const express = require('express');
const morgan = require('morgan');

function configExpress(app) {
  app.use(morgan('dev'));
  app.use(express.json());
}

module.exports = configExpress;
