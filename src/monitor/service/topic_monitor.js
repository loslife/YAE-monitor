var request = require('request');
var services = require("./services");
var info = require("./info.json");
var monitor = require("./monitor");

exports.start = start;

var TIME_INTERVAL_POSTERS = 1000 * 60 * 60 * 1;
var TIME_INTERVAL_CATEGORIES = 1000 * 60 * 60 * 1;
var TIME_INTERVAL_HOTESTTOPIC = 1000 * 60 * 60 * 1;

//启动监控任务
function start(){
    console.log("topics monitor working ~");
    monitorPosters();
    monitorCategories();
    monitorHotestTopic();
    setInterval(monitorPosters, TIME_INTERVAL_POSTERS);
    setInterval(monitorCategories, TIME_INTERVAL_CATEGORIES);
    setInterval(monitorHotestTopic, TIME_INTERVAL_HOTESTTOPIC);
}

//posters接口监控
function monitorPosters(){

    var api = "/posters";
    var url = info.host + api;
    var option = {
        method: "GET",
        uri: url,
        json:true,
        time: true
    };
    request(option, function(error, response, body){
        if(error){
            return logger.error(error);
        }
        //接口正常
        var param = "接口" + api + ",";
        var result = "正常";
        if(body && body.result && body.result.posters && body.result.posters.length > 0){
            monitor.setResult(api, {
                result: result,
                elapsedTime: response.elapsedTime
            });
            return ;
        }
        //接口异常，发送短信
        result = "数据为空";
        monitor.setResult(api, {
            result: result,
            elapsedTime: response.elapsedTime
        });
        services.sendMsg(param + result);
    });
}

//categories接口监控
function monitorCategories(){

    var api = "/categories";
    var url = info.host + api;
    var option = {
        method: "GET",
        uri: url,
        json:true,
        time: true
    };
    request(option, function(error, response, body){
        if(error){
            return console.log(error);
        }
        //接口正常
        var param = "接口" + api + ",";
        var result = "正常";
        if(body && body.result && body.result.categories && body.result.categories.length > 0){
            monitor.setResult(api, {
                result: result,
                elapsedTime: response.elapsedTime
            });
            return ;
        }
        //接口异常，发送短信
        result = "数据为空";
        monitor.setResult(api, {
            result: result,
            elapsedTime: response.elapsedTime
        });
        services.sendMsg(param + result);
    });
}

//hotestTopic接口监控
function monitorHotestTopic(){

    var api = "/hotestTopic";
    var url = info.host + api;
    var option = {
        method: "GET",
        uri: url,
        json:true,
        time: true
    };
    request(option, function(error, response, body){
        if(error){
            return logger.error(error);
        }
        //接口正常
        var param = "接口" + api + ",";
        var result = "正常";
        if(body && body.result && body.result.topics && body.result.topics.length > 0){
            monitor.setResult(api, {
                result: result,
                elapsedTime: response.elapsedTime
            });
            return ;
        }
        //接口异常，发送短信
        result = "数据为空";
        monitor.setResult(api, {
            result: result,
            elapsedTime: response.elapsedTime
        });
        services.sendMsg(param);
    });
}