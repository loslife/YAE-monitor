exports.start = start;
exports.setResult = setResult;
exports.getResult = getResult;

//启动监控任务
function start(){
    require("./topic_monitor").start();
    require("./qjc_monitor").start();
    require("./community_monitor").start();
}

//接口数据记录
var api_result = {};

function setResult(key, value){
    api_result[key] = value;
}

function getResult(){
    return api_result;
}