var request = require('request');
var services = require("./services");
var info = require("./info.json");

exports.start = start;

var TIME_INTERVAL_POSTERS = 1000 * 60 * 60 * 1;
var TIME_INTERVAL_CATEGORIES = 1000 * 60 * 60 * 1;

//启动监控任务
function start(){
    console.log("index monitor working ~");
    setInterval(monitorPosters, TIME_INTERVAL_POSTERS);
    setInterval(monitorCategories, TIME_INTERVAL_CATEGORIES);
}

//posters接口监控
function monitorPosters(){

    var api = "/posters";
    var url = info.host + api;
    var option = {
        method: "GET",
        uri: url,
        json:true
    };
    request(option, function(error, response, body){
        if(error){
            return logger.error(error);
        }
        //接口正常
        if(body && body.result && body.result.posters && body.result.posters.length > 0){
            return ;
        }
        //接口异常，发送短信
        param = "接口" + api + "," + "数据为空";
        services.sendMsg(param);
    });
}

//categories接口监控
function monitorCategories(){

    var api = "/categories";
    var url = info.host + api;
    var option = {
        method: "GET",
        uri: url,
        json:true
    };
    request(option, function(error, response, body){
        if(error){
            return console.log(error);
        }
        //接口正常
        if(body && body.result && body.result.categories && body.result.categories.length > 0){
            return ;
        }
        //接口异常，发送短信
        param = "接口" + api + "," + "数据为空";
        services.sendMsg(param);
    });
}