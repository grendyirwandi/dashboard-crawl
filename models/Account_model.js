'use strict';
const tables = require('./tables');
const Joi = require('@hapi/joi');
// const jwt = require('jsonwebtoken');
const { generateKeyPairSync } = require('crypto');
// const { SETREDIS, GETREDIS } = require('./Redis');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class Account_model {
    async getAccount(params) {
        let query = {
            attributes: {
                include : [
                    [
                        Sequelize.literal("(SELECT `tbl_mutasi`.`balance` FROM `tbl_mutasi` WHERE `tbl_mutasi`.`id_account` = `tbl_accounts`.`id_account` ORDER BY `tbl_mutasi`.`createdAt` DESC  LIMIT 1)"),
                        'balance'
                    ]
                ],
            },
            // where : {
            //     username : params.login.username
            // },
            include : [{
                attributes: ['info_bank'],
                model: tables["tbl_bank"],
                required: true,
            }]
        }
        return await tables["tbl_accounts"].findAll(query);
    }
    async getMutatiion(id_account, id_bank) {
        let query = {
            attributes: [
                'id_account',
                'name_account',
            ],
            where : {
                id_account : id_account
            },
            order: [[tables[`tbl_mutasi`], 'createdAt', 'DESC']],
            include : [{
                model: tables[`tbl_mutasi`],
                required: true,
            }]
        }

        return await tables["tbl_accounts"].findAll(query);
    }

    async getMutatiionBetween(data, id_account) {
        let res = data["range"].split(/[\s-/,]+/);
        let start = `${res[2]}-${res[0]}-${res[1]}`
        let end = `${res[5]}-${res[3]}-${res[4]}`
        let query = {
            attributes: [
                'id_account',
                'name_account',
            ],
            where : {
                id_account : id_account,
            },
            order: [[tables[`tbl_mutasi`], 'createdAt', 'DESC']],
            include : [{
                model: tables[`tbl_mutasi`],
                where: {
                    date_trans: {
                        [Op.between] : [start, end]
                    }
                },
                required: true,
            }]
        }

        return await tables["tbl_accounts"].findAll(query);
    }

    async getById(id_account) {
        let query = {
            where : {
                id_account : id_account
            },
        }

        return await tables["tbl_accounts"].findOne(query);
    }

    async valiAddDevice(params){
        const schema = {
            udid: Joi.string().label('Udid').min(3).max(199).required(),
            number: Joi.string().label('Number').min(3).max(199),
            name: Joi.string().label('Name').min(3).max(199),
            bank: Joi.string().label('Bank').min(3).max(199),
            provider: Joi.string().label('Provider').min(3).max(199),
            destination: Joi.string().label('Port').min(3).max(199),
            mpin: Joi.string().label('Mpin').min(3).max(199),
            username: Joi.string().label('Username').min(3).max(199),
            password: Joi.string().label('Password').min(3).max(199),
            rekening: Joi.string().label('Rekening').min(3).max(199),
        }

        return Joi.validate(params, schema, {
            abortEarly: false
        });
    }
    valiGoTransfer(params){
        const schema = {
            udid: Joi.string().min(3).max(199).required(),
            rekening: Joi.string().min(3).max(199).required(),
            nominal: Joi.string().min(3).max(199).required(),
        }

        return Joi.validate(params, schema, {
            abortEarly: false
        });
    }
    valiGoTransferArray(params){
        const schema = {
            udid: Joi.array().min(2).max(199).required().items(Joi.string().min(3)),
            rekening: Joi.array().min(2).max(199).required().items(Joi.string().min(3)),
            nominal: Joi.array().min(2).max(199).required().items(Joi.string().min(3)),
        }

        return Joi.validate(params, schema, {
            abortEarly: false
        });
    }
    
}

module.exports = Account_model;