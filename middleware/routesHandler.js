module.exports = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token, Authorization, RBR");
    res.header('Access-Control-Expose-Headers', 'x-auth-token');
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
}