exports.login = login;
exports.logout = logout;

function login(req, res, next) {
    var username = req.body["username"];
    var password = req.body["password"];
    if(username == "admin" && password =="111111"){
        req.session.username = username;
        doResponse(req, res, {user: username});
    }else{
        next({errorCode: 10050001, message: "登录失败，用户名或密码错误"});
    }
}

function logout(req, res, next) {
    req.session.destroy();
    res.redirect("http://monitor.naildaka.com/framework/index.html#/login/signin");
}
