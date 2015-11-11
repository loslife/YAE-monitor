var dbHelper = require(FRAMEWORKPATH + "/utils/dbHelper");
var logger = require(FRAMEWORKPATH + "/utils/logger").getLogger();
var async = require("async");
var redis1 = require("./redisClient_1");

exports.exec = function(params){
    setAccounts();
};

//刷新账户
function setAccounts(){
    var sql = "select * from accounts";
    dbHelper.execSql(sql, {}, function(err, results){
        if(err){
            return logger.error(err);
        }
        async.each(results, function(item, callback){
            redis1.getClient(function(client){
                client.hmset(item.id, item, function(err){
                    if(err){
                        return callback(err);
                    }
                    callback();
                });
            });
        }, function(err){
            if(err){
                return logger.error(err);
            }
            logger.info("accounts初始化成功~");
        });
    });
}