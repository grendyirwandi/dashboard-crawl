'use strict';
const Controller = require('../core/Controller'),
        bcrypt = require('bcrypt'),
        axios = require('axios'),
        config = require('config');

class Home extends Controller {
    constructor(req, res) {
        super(res);
        this.req = req;
        this.account_model = this._model('Account_model');
        this.Mailing_list_model = this._model('Mailing_list_model');
    }

    async home(){
        this.req.session.infoAcc = await this.account_model.getAccount()
        // console.log(JSON.parse(JSON.stringify(this.req.session.infoAcc)));
        this.res.render("home", {
            title: "Accounts ~ Dashboard",
            data: this.req.session.login,
            datas: this.req.session.infoAcc,
            error: "",
        });
    }
    async logs(params){
        let listAcc = await this.account_model.getMutatiion(params.id, params.bank)
        let logId = await this.account_model.getById(params.id)
        this.res.render("logs", {
            title: "Logs ~ Dashboard",
            logId: logId,
            data: this.req.session.login,
            datas: listAcc,
            tbl:params.bank,
            error: "",
        });
    }
    async logsBetween(params){
        if (params == null) this.res.redirect('/home')
        
        let logId = await this.account_model.getById(params.id)
        let listAcc = await this.account_model.getMutatiionBetween(this.req.body, params.id)
        this.res.render("logs", {
            title: "Logs ~ Dashboard",
            logId: logId,
            data: this.req.session.login,
            datas: listAcc,
            tbl:params.bank,
            error: "",
        });
    }

    async trans(){
        let dataTrans = await this.fetchAxios('http://192.168.1.52:9002/trf/list');
        this.res.render("trans", {
            title: "Transfer ~ Dashboard",
            data: this.req.session.login,
            datas: dataTrans,
            error: "",
        });
    }
    async device(){
        let dataDevice = await this.fetchAxios('http://192.168.1.52:9002/devices');
        this.res.render("device", {
            title: "Device ~ Dashboard",
            data: this.req.session.login,
            datas: dataDevice,
            error: "",
        });
    }

    async addDevice(){
        this.res.render("add-device", {
            title: "Add Device ~ Dashboard",
            data: this.req.session.login,
            error: "",
        });
    }

    async addDeviceSubmit(){
        let dataJSON = {
            udid: this.req.body.udid,
            number: this.req.body.number,
            name: this.req.body.name,
            bank: this.req.body.bank,
            status: "new",
            credit:  0,
            active: "",
            provider: this.req.body.provider,
            destination: parseInt(this.req.body.destination),
            mpin: this.req.body.mpin,
            username: this.req.body.username,
            password: this.req.body.password,
            rekening: this.req.body.rekening
        }
        let post = await this.postAxios('http://192.168.1.52:9002/devices/register', dataJSON)
        if(post == "error"){
            this.res.render("add-device", {
                title: "Add Device ~ Dashboard",
                data: this.req.session.login,
                errorAddDevice: "Failed add device because data already exist",
                error: "",
            });
        }else{
            this.res.render("add-device", {
                title: "Add Device ~ Dashboard",
                data: this.req.session.login,
                successAddDevice: "Success add data device",
                error: "",
            });
        }
    }

    async goTransfer(){
        let dataDevice = await this.fetchAxios('http://192.168.1.52:9002/devices');
        console.log(dataDevice);
        this.res.render("go-transfer", {
            title: "Transfer Action ~ Dashboard",
            data: this.req.session.login,
            datas: dataDevice,
            error: "",
        });
    }

    async goTransferSubmit(){
        console.log(this.req.body);
        let dataJSON = []
        console.log(typeof(this.req.body.udid) == 'object');
        if(typeof(this.req.body.udid) == 'object'){
            console.log("masuk objek");
            const {error, value} = this.account_model.valiGoTransferArray(this.req.body)
            if (error){
                let dataDevice = await this.fetchAxios('http://192.168.1.52:9002/devices');
                return this.res.render("go-transfer", {
                    title: "Transfer Action ~ Dashboard",
                    data: this.req.session.login,
                    datas: dataDevice,
                    errorTrans: "Invalid input, Failed to transfer",
                    error: "",
                });
            }else{
                for (let i = 0; i < this.req.body.udid.length; i++) {
                    dataJSON.push({
                        udid: this.req.body.udid[i],
                        rekening: this.req.body.rekening[i],
                        nominal: this.req.body.nominal[i].replace(/\./g, "")
                    })
                }
                console.log(dataJSON);
                await this.postAxios('http://192.168.1.52:9002/trf/multi', dataJSON)

                let dataDevice = await this.fetchAxios('http://192.168.1.52:9002/devices');
                return this.res.render("go-transfer", {
                    title: "Transfer Action ~ Dashboard",
                    data: this.req.session.login,
                    datas: dataDevice,
                    successTrans: "Success, Transfer in progress",
                    error: "",
                });
            }
        }else{
            console.log("masuk bkn objek");
            const {error, value} = this.account_model.valiGoTransfer(this.req.body)
            if (error){
                let dataDevice = await this.fetchAxios('http://192.168.1.52:9002/devices');
                return this.res.render("go-transfer", {
                    title: "Transfer Action ~ Dashboard",
                    data: this.req.session.login,
                    datas: dataDevice,
                    errorTrans: "Invalid input, Failed to transfer",
                    error: "",
                });
            }else{
                dataJSON.push({
                    udid: this.req.body.udid,
                    rekening: this.req.body.rekening,
                    nominal: this.req.body.nominal.replace(/\./g, "")
                })
                console.log(dataJSON);
                await this.postAxios('http://192.168.1.52:9002/trf/multi', dataJSON)

                let dataDevice = await this.fetchAxios('http://192.168.1.52:9002/devices');
                return this.res.render("go-transfer", {
                    title: "Transfer Action ~ Dashboard",
                    data: this.req.session.login,
                    datas: dataDevice,
                    successTrans: "Success, Transfer in progress",
                    error: "",
                });
            }
        }
    }

    async notification(){
        let datas = await this.Mailing_list_model.getAllMailing()
        this.res.render("notification", {
            title: "Notification ~ Dashboard",
            data: this.req.session.login,
            datas: datas,
            error: "",
        });
    }
    async addAccNotif(){
        await this.Mailing_list_model.insertMailing(this.req.body)
        this.res.redirect('/notification')
    }
    async updateAccNotif(params){
        await this.Mailing_list_model.updateMailing(this.req.body, params.id)
        this.res.redirect('/notification')
    }
    async deleteAccNotif(params){
        await this.Mailing_list_model.deleteMailing(params.id)
        this.res.redirect('/notification')
    }

    async fetchAxios(gateway){
        const options = {
            method: 'GET',
            url: gateway,
            headers: {apikey: '1f5fddf0R8c5fR4026R80b0Rfa864e2b98cb'}
        };
        try {
            const data = await axios.request(options)
            return data.data
        } catch (error) {
            console.error(error);
        }
    }

    async postAxios(gateway, data){
        const options = {
            method: 'POST',
            url: gateway,
            headers: {apikey: '1f5fddf0R8c5fR4026R80b0Rfa864e2b98cb'},
            data: data
        };
        try {
            const data = await axios.request(options)
            return "success"
        } catch (error) {
            console.log("masuk error");
            console.error(error);
            // console.log(error.response.data.message);
            return "error"
        }
    }


}

module.exports = Home;
