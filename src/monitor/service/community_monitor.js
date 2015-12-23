var request = require('request');
var services = require("./services");
var info = require("./info.json");
var monitor = require("./monitor");

exports.start = start;

var TIME_INTERVAL_OFFICALANDRECOMMEND = 1000 * 60 * 60 * 1;

//启动监控任务
function start(){
    console.log("community monitor working ~");
    monitorOfficalAndRecommend();
    setInterval(monitorOfficalAndRecommend, TIME_INTERVAL_OFFICALANDRECOMMEND);
}

function monitorOfficalAndRecommend(){

    var api = "/community/getOfficalAndRecommend";
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
        var param = "接口" + api + ",";
        var result = "";
        var flag = false;
        if(!body.result.recommendCommunity){
            result += "缺失recommendCommunity/";
            flag = true;
        }
        if(body.result.officialCommunity){
            if(body.result.officialCommunity.length <= 0){
                result += "officialCommunity.length<=0/";
                flag = true;
            }
        }else{
            result += "缺失officialCommunity/";
            flag = true;
        }
        //接口异常，发送短信
        if(flag){
            monitor.setResult(api, {
                result: result,
                elapsedTime: response.elapsedTime
            });
            services.sendMsg(param + result);
        }else{
            monitor.setResult(api, {
                result: "正常",
                elapsedTime: response.elapsedTime
            });
        }
    });

}