/**
 * Created by jun on 2016/4/23.
 * 用户模型
 */
var mysql = require('mysql');
var dbconfig = require("../config/database");

//使用连接池
var pool = mysql.createPool(dbconfig.mysql);

module.exports = {
    showUser : function(req,res,callback) {
        pool.getConnection(function(err, connection) {
            //定义查询语句
            var sql = "SELECT * FROM `test`";
            // console.log(sql);
            connection.query(sql,function(err,result) {
                // console.log(result);
                result = JSON.stringify(result);
                callback(err,result);
                // 释放连接
                connection.release();
            })

        });
    },
    test:function() {
        return "hello world from test";
    },
    findbynp:function (req,res,callback) {
        var name = req.body.name;
        var pwd = req.body.pwd;
        var val;
        pool.getConnection(function(err, connection) {
            //定义查询语句
            var sql = "SELECT * FROM `yh_users` where name='"+name+"' and password='"+pwd+"'";
            // console.log(sql);return;
            connection.query(sql,function(err,result) {
                val = JSON.stringify(result);
                connection.release();
                callback(err,result);
                // 释放连接
            })
        });
    }
}