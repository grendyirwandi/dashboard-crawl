'use strict';
const tables = require('./tables');
const Joi = require('@hapi/joi');
// const jwt = require('jsonwebtoken');
const { generateKeyPairSync } = require('crypto');
// const { SETREDIS, GETREDIS } = require('./Redis');
const Sequelize = require('sequelize');
// const Op = Sequelize.Op;

class Login_model {
    async login(params) {
        let query = {
            where: { username: params.username }
        }
        return await tables["tbl_users"].findOne(query);
    }

    validation(params) {
        if (  req.body.username != "" || (req.body.username != null && req.body.password != "") || req.body.password != null) {

        } else {
            res.redirect("login");
        }
    }
}

module.exports = Login_model;