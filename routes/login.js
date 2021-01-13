'use strict';
const login = require('../controller/Login'),
 islogin = require('../middleware/isLogin'),
 express = require('express'),
 router = express.Router();

router.get('/', (req, res) => {
    res.redirect("auth");
});

router.get('/auth', (req, res) => {
    new login(req, res).check();
});

router.get('/logout', (req, res) => {
    new login(req, res).logout();
});

router.post('/auth', async (req, res) => {
    await new login(req, res).auth();
});

module.exports = router;