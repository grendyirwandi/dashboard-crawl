'use strict';
const Controller = require('../core/Controller'),
        bcrypt = require('bcrypt'),
        config = require('config');

class Login extends Controller {
    constructor(req, res) {
        super(res);
        this.req = req;
        this.login_model = this._model('Login_model');
    }

    check() {
        if (this.req.session.login != undefined) {
            this.res.redirect("home");
        }else {
            if (this.req.session.errLogin) {
                this.res.render("login", {
                    title: "Login ~ Dashboard",
                    error: this.req.session.errLogin,
                });
            }else{   
                this.res.render("login", {
                    title: "Login ~ Dashboard",
                    error: "",
                });
            }
        }
    }

    login(){
        this.res.render("login", {
            title: "Login ~ Dashboard",
            error: "",
        });
    }

    logout(){
        this.req.session.destroy();
        this.res.redirect("auth");
    }

    async auth(){
        const getOne = await this.login_model.login(this.req.body)
        if (getOne == null) {
            this.req.session.errLogin = "Incorrect username or password.";
            this.res.redirect("auth");
        }else{
            if (bcrypt.compareSync(this.req.body.password, getOne.password)) {
                this.req.session.login = getOne
                this.res.redirect("home");
            }else {
                this.req.session.errLogin = "Incorrect password.";
                this.res.redirect("auth");
            }
        }
    }
    
}

module.exports = Login;