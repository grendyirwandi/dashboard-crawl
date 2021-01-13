'use strict';
const tables = require('./tables');
const Joi = require('@hapi/joi');
// const jwt = require('jsonwebtoken');
const { generateKeyPairSync } = require('crypto');
// const { SETREDIS, GETREDIS } = require('./Redis');
const Sequelize = require('sequelize');
// const Op = Sequelize.Op;

class Mutasi_model {
    async getAllMutasi() {
        let query = {
            attributes: {
                include : [
                    [
                        Sequelize.literal("(SELECT `tbl_mutasi`.`balance` FROM `tbl_mutasi` WHERE `tbl_mutasi`.`id_account` = `tbl_account`.`id_account` ORDER BY `tbl_mutasi`.`createdAt` DESC  LIMIT 1)"),
                        'balance'
                    ]
                ],
            },
        }
        return await tables["tbl_accounts"].findAll(query);
    }
}

module.exports = Mutasi_model;