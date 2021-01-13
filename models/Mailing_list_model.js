'use strict';
const tables = require('./tables');
const Joi = require('@hapi/joi');
// const jwt = require('jsonwebtoken');
const { generateKeyPairSync } = require('crypto');
// const { SETREDIS, GETREDIS } = require('./Redis');
const Sequelize = require('sequelize');
// const Op = Sequelize.Op;

class Mailing_list_model {
    async getAllMailing() {
        return await tables["tbl_mailing_list"].findAll();
    }

    async insertMailing(data){
        let datas = {
            nama: data.nama,
            email: data.email,
            phone: data.phone
        }
        return await tables["tbl_mailing_list"].create(datas);
    }

    async deleteMailing(id) {
        return await tables["tbl_mailing_list"].destroy({
            where: {
                id: id
            }
        });    
    }

    async updateMailing(data, id){
        let datas = {
            nama: data.nama,
            email: data.email,
            phone: data.phone
        }
        return await tables["tbl_mailing_list"].update(datas,{
            where: {
                id: id
            }
        });
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

module.exports = Mailing_list_model;