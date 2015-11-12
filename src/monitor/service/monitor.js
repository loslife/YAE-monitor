var request = require('request');
var services = require("./services");
var info = require("./info.json");

exports.start = start;

var TIME_INTERVAL_ACTIVITY = 1000 * 60 * 60 * 1;
var TIME_INTERVAL_POSTERS = 1000 * 60 * 60 * 1;
var TIME_INTERVAL_CATEGORIES = 1000 * 60 * 60 * 1;

//启动监控任务
function start(){
    setInterval(monitorActivity, TIME_INTERVAL_ACTIVITY);
    setInterval(monitorPosters, TIME_INTERVAL_POSTERS);
    setInterval(monitorCategories, TIME_INTERVAL_CATEGORIES);
}

//当期活动详情接口监控
function monitorActivity(){

    var api = "/qjc/activity";
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
        var param = "接口" + api + ",";
        var flag = false;
        if(body && body.result && body.result.stage && body.result.endTime && body.result.no){
            var result = body.result;
            if(result.stage == 1){
                if(result.previous){
                    if(!result.previous.topicId){
                        param += "第一阶段previous.topicId数据为空/";
                        flag = true;
                    }
                    if(!result.previous.picUrl){
                        param += "第一阶段previous.picUrl数据为空/";
                        flag = true;
                    }
                    if(!result.previous.title){
                        param += "第一阶段previous.title数据为空/";
                        flag = true;
                    }
                    if(!result.previous.authorName){
                        param += "第一阶段previous.authorName数据为空/";
                        flag = true;
                    }
                    if(!result.previous.authorPhoto){
                        param += "第一阶段previous.authorPhoto数据为空/";
                        flag = true;
                    }
                }else{
                    param += "第一阶段previous数据为空/";
                    flag = true;
                }
            }
            if(result.stage == 2){
                if(result.current){
                    if(!result.current.picUrl){
                        param += "第一阶段current.picUrl数据为空/";
                        flag = true;
                    }
                    if(!result.current.authorName){
                        param += "第一阶段current.authorName数据为空/";
                        flag = true;
                    }
                    if(!result.current.topicId){
                        param += "第一阶段current.voteCount数据为空/";
                        flag = true;
                    }
                    if(!result.current.topicId){
                        param += "第一阶段current.authorPhoto数据为空/";
                        flag = true;
                    }
                }else{
                    param += "第一阶段current数据为空/";
                    flag = true;
                }
            }
        }else{
            param += "result数据异常;";
            flag = true;
        }
        //接口异常，发送短信
        if(flag){
            services.sendMsg(param);
        }
    });
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