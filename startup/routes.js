'use strict';
const {
    notFound,
    error
} = require('../middleware/error');
const routesHandler = require('../middleware/routesHandler');

// const winston = require('../config/winston');

const moment = require('moment');
const path = require('path');
const express = require('express');
// const cookieParser = require('cookie-parser');
const session = require('express-session')
const morgan = require('morgan');

const loginRoutes = require('../routes/login');
const homeRoutes = require('../routes/home');

module.exports = function (app) {
    app.use(session({secret: 'M1r34cl3', resave: true, saveUninitialized: true, cookie: {maxAge: 3600000*3}}))
    app.use('/assets', express.static(path.join(__dirname, '/../assets')))
    // view engine setup
    app.set('views', path.join(__dirname, '/../views'));
    app.set('view engine', 'pug');

    morgan.token('date', () => {
        return moment().utcOffset('+0700').format();
    })

    // app.use(morgan('combined', { stream: winston.stream }));
    app.use(express.urlencoded({extended: true}));
    app.use(express.json({ limit: '50mb' }));
    // app.use(cookieParser());

    // routes handler
    app.use(routesHandler);

    app.use('/', loginRoutes);
    app.use('/', homeRoutes);

    // catch 404 and forward to error handler
    app.use(notFound);

    // error handler
    app.use(error);
}