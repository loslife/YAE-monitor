var request = require('request');
var moment = require("moment");
var info = require("./info.json");
var Base64 = require('js-base64').Base64;
var util = require(FRAMEWORKPATH + "/utils/utils");
var logger = require(FRAMEWORKPATH + "/utils/logger").getLogger();

exports.sendMsg = sendMsg;

//短信接口
function sendMsg(param){
    info.phones.forEach(function(number){
        sendMsgByNumber(number, param, function(err){
            if(err){
                logger.error(err);
            }
        });
    });
}

function sendMsgByNumber(to, param, callback){

    var host = "https://api.ucpaas.com";
    var SoftVersion = "2014-06-30";
    var accountSid = "1491b0f4b39bc1167f54d115ea110c3c";
    var authToken = "c5bb17bf91b802e897f3faacc7d6a927";
    var date = moment().format("YYYYMMDDHHmmss");
    var SigParameter = util.md5(accountSid + authToken + date).toUpperCase();
    var Authorization = Base64.encode(accountSid + ":" + date);
    var postUrl = "/" + SoftVersion + "/Accounts/" + accountSid + "/Messages/templateSMS?sig=" + SigParameter;

    var options = {
        method: 'POST',
        uri: host + postUrl,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': Authorization
        },
        body: {
            "templateSMS" : {
                "appId"       : "c9bdfffe4d824b639d005ca646d313ef",
                "param"       : param,
                "templateId"  : "8601",
                "to"          : to
            }
        },
        json: true
    };

    request(options, function(err, response){
        console.log(response);
        if(err){
            return callback(err);
        }
        if(response.body.resp.respCode !== '000000'){
            return callback(new Error("系统错误，请联系管理员"));
        }
        callback();
    });
}