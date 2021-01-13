'use strict';
const home = require('../controller/Home'),
auth = require('../middleware/auth'),
express = require('express'),
router = express.Router();

router.get('/home', auth, (req, res) => {
    new home(req, res).home();
});
router.get('/logs/:bank/:id', auth, async (req, res) => {
    await new home(req, res).logs(req.params);
});
router.post('/logs-between/:id', auth, async (req, res) => {
    await new home(req, res).logsBetween(req.params);
});

router.get('/transfer', auth, (req, res) => {
    new home(req, res).trans();
});

router.get('/device', auth, async (req, res) => {
    await new home(req, res).device();
});
router.get('/add-device', auth, async (req, res) => {
    await new home(req, res).addDevice();
});
router.post('/add-device', auth, async (req, res) => {
    await new home(req, res).addDeviceSubmit();
});

router.get('/go-transfer', auth, async (req, res) => {
    await new home(req, res).goTransfer();
});
router.post('/go-transfer', auth, async (req, res) => {
    await new home(req, res).goTransferSubmit();
});

router.get('/notification', auth, async (req, res) => {
    await new home(req, res).notification();
});
router.post('/add-notif-acc', auth, async (req, res) => {
    await new home(req, res).addAccNotif();
});
router.post('/update-notif-acc/:id', auth, async (req, res) => {
    await new home(req, res).updateAccNotif(req.params);
});
router.get('/delete-notif-acc/:id', auth, async (req, res) => {
    await new home(req, res).deleteAccNotif(req.params);
});


module.exports = router;