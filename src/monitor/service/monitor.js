exports.start = start;

//启动监控任务
function start(){
    require("./topic_monitor").start();
    require("./qjc_monitor").start();
    require("./community_monitor").start();
}