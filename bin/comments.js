var dbHelper = require(FRAMEWORKPATH + "/utils/dbHelper");
var logger = require(FRAMEWORKPATH + "/utils/logger").getLogger();
var async = require("async");
var redis1 = require("./redisClient_1");
var redis2 = require("./redisClient_2");

exports.exec = function(params){
    setComments();
};

//评论
function setComments(){

    logger.info("comments初始化开始~");
    var sql = "select a.id 'id',a.account_id 'account_id',a.create_date 'createDate'," +
        "a.content 'content',a.content_pic 'contentPic',a.isHomework 'isHomework',a.at_account_id 'at_account_id'," +
        "a.status 'status',a.score 'score' " +
        "from comments a " +
        "where a.reply_to is Null and a.topic_id=:id and a.ready=1 order by a.create_date desc";

    var topicSql = "select id from topics";

    redis2.getClient(function(client){

        client.flushdb(function(err){
            if(err){
                logger.error(err);
                return process.exit(0);
            }

            dbHelper.execSql(topicSql, {}, function(err, topicIds){
                if(err){
                    logger.error(err);
                    return process.exit(0);
                }

                async.each(topicIds, function(topic, nextOne){
                    if(err){
                        return nextOne(err);
                    }

                    dbHelper.execSql(sql, {id: topic.id}, function(err, results){
                        if(err){
                            return nextOne(err);
                        }

                        async.each(results, function(item, next){

                            var at = {};
                            var replys = [];
                            var replysAt = [];

                            getAccountByid(item["account_id"], function(err, account_result){

                                if(err){
                                    return next(err);
                                }

                                async.series([_queryAt, _queryReplys, _queryReplysAt], function(err){

                                    if(err){
                                        return next(err);
                                    }

                                    item.at = JSON.stringify(at);
                                    item.replys = JSON.stringify(replysAt);
                                    item.author = account_result[0]["nickname"];
                                    item.authorPhoto = account_result[0]["photo_url"];
                                    item.userid = account_result[0]["id"];

                                    delete item["at_account_id"];

                                    client.zadd(topic.id, parseInt(item.createDate), item.id, function(error){
                                        if(error){
                                            return next(error);
                                        }

                                        client.hmset(item.id, item, function(err){
                                            if(err){
                                                return next(err);
                                            }
                                            next(null);
                                        });

                                    });

                                });

                                //根据comment查询@的账号信息
                                function _queryAt(callback){

                                    var atSql = "select t.id 'userId',t.nickname 'nickname' from accounts t where t.id = :id";

                                    dbHelper.execSql(atSql, {id: item["at_account_id"]}, function(err, results){

                                        if(err){
                                            return callback(err);
                                        }

                                        at = results[0] || {};
                                        callback(null);
                                    });
                                }
                                //根据comment查询回复
                                function _queryReplys(callback){

                                    var replysSql = "select t.id 'id',a.id 'userid',a.nickname 'author',t.create_date 'createDate',t.content 'content'," +
                                        "t.content_pic 'contentPic',t.isHomework 'isHomework',t.at_account_id 'at_account_id',t.status 'status' " +
                                        "from comments t left join accounts a on t.account_id = a.id " +
                                        "where t.reply_to = :id order by t.create_date";

                                    dbHelper.execSql(replysSql, {id: item["id"]}, function(err, results){

                                        if(err){
                                            return callback(err);
                                        }

                                        replys = results;
                                        callback(null);
                                    });
                                }
                                //根据_queryReplys的结果查询回复中@的账号信息
                                function _queryReplysAt(callback){


                                    async.eachSeries(replys, function(item, cb){
                                        var id = item["at_account_id"];

                                        getAccountByid(id, function(err, result){
                                            if(err){
                                                return cb(err);
                                            }
                                            item.at = {
                                                userId: result[0].id,
                                                nickname: result[0].nickname
                                            };
                                            delete item["at_account_id"];
                                            replysAt.push(item);
                                            cb(null);
                                        });

                                    }, function(err){
                                        if(err){
                                            return callback(err);
                                        }

                                        return callback(null);
                                    });
                                }
                            });

                        }, function(err){
                            if(err){
                                return nextOne(err);
                            }
                            nextOne(null);
                        });

                    });
                }, function(err){
                    if(err){
                        logger.error(err);
                        return process.exit(0);
                    }
                    logger.info("comments初始化成功~");
                    process.exit(0);
                });
            });
        });
    });

}

//根据单个id查询account信息
function getAccountByid(id, callback){

    var result = {
        id: null,
        username: "",
        password: null,
        nickname: null,
        photo_url: null,
        type: null,
        gender: null,
        birthday: null,
        exp: 0,
        profile: null,
        coin: 0,
        homepage_background: ""
    };

    redis1.getClient(function(client){
        client.hgetall(id, function(err, obj){
            var sql = "select * from accounts where id=:id";
            if(err){
                logger.error(err);
                dbHelper.execSql(sql, {id: id}, function(error, datas){
                    if(error){
                        callback(error);
                        return;
                    }
                    if(datas.length == 0){

                        callback(null, [result]);
                        return;
                    }

                    callback(null, [datas[0]]);

                });
                return;
            }
            if(!obj){

                dbHelper.execSql(sql, {id: id}, function(error, datas){
                    if(error){
                        callback(error);
                        return;
                    }
                    if(datas.length == 0){

                        callback(null, [result]);
                        return;
                    }
                    callback(null, [datas[0]]);

                });
            }else{
                if(obj.photo_url == "null"){
                    obj.photo_url = null;
                }
                if(obj.type){
                    obj.type = parseInt(obj.type);
                }
                if(obj.gender){
                    obj.gender = parseInt(obj.gender);
                }
                if(obj.birthday){
                    obj.birthday = parseInt(obj.birthday);
                }
                if(obj.homepage_background == "null"){
                    obj.homepage_background =null;
                }
                if(obj.coin){
                    obj.coin = parseInt(obj.coin);
                }
                if(obj.exp){
                    obj.exp = parseInt(obj.exp);
                }
                if(obj.profile == "null"){
                    obj.profile = null;
                }
                callback(null, [obj]);
            }

        });
    });

}