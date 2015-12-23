var redis = require("redis");
var logger = require(FRAMEWORKPATH + "/utils/logger").getLogger();

exports.getClient = getClient;
exports.quitClient = quitClient;

var redis_ip = "10.161.228.193";
var redis_port = 6379;

//var client = redis.createClient();
var client = redis.createClient(redis_port, redis_ip);
client.on("error", function(err){
    logger.error(err);
});

var selected = false;
function getClient(callback){
    if(selected){
        process.nextTick(function(){
            callback(client);
        });
        return;
    }
    client.select(2, function(){
        selected = true;
        callback(client);
    });
}

function quitClient(){
    client.quit();
}