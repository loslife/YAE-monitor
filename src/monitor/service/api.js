var monitor = require("./monitor");

exports.apiDetails = apiDetails;

//接口统计
function apiDetails(req, res, next){
    var result = monitor.getResult();
    doResponse(req, res, result);
}