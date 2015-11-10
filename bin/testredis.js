//var redis = require("./redisClient_0");

//redis.getClient(function(client){
//    client.hkeys("hash key", function (err, replies) {
//        console.log(replies.length + " replies:");
//        replies.forEach(function (reply, i) {
//            console.log("    " + i + ": " + reply);
//        });
//
//        redis.quitClient();
//    });
//});

var redis = require("./redisClient_2");

redis.getClient(function(client){
    console.log("client is good");
});

redis.getClient(function(client){
    client.set("username", "keller", function(res){
        console.log(res);
        redis.quitClient();
    });
});