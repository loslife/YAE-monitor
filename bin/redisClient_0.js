var redis = require("redis");

exports.getClient = getClient;
exports.quitClient = quitClient;

var redis_ip = "10.161.228.193";
var redis_port = 6379;

var client = redis.createClient();
//var client = redis.createClient(redis_port, redis_ip);
client.on("error", function(err){
    logger.error(err);
});

function getClient(callback){
    process.nextTick(function(){
        callback(client)
    });
}

function quitClient(){
    client.quit();
}