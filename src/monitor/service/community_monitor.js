var request = require('request');
var services = require("./services");
var info = require("./info.json");

exports.start = start;

var TIME_INTERVAL_OFFICALANDRECOMMEND = 1000 * 60 * 60 * 1;

//启动监控任务
function start(){
    console.log("community monitor working ~");
    setInterval(monitorOfficalAndRecommend, TIME_INTERVAL_OFFICALANDRECOMMEND);
}

function monitorOfficalAndRecommend(){

    var api = "/community/getOfficalAndRecommend";
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
        var param = "接口" + api + ",";
        var flag = false;
        if(!body.result.recommendCommunity){
            param += "缺失recommendCommunity/";
            flag = true;
        }
        if(body.result.officialCommunity){
            if(body.result.officialCommunity.length <= 0){
                param += "officialCommunity.length<=0/";
                flag = true;
            }
        }else{
            param += "缺失officialCommunity/";
            flag = true;
        }
        //接口异常，发送短信
        if(flag){
            console.log(param);
            services.sendMsg(param);
        }
    });

}