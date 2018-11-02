var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../db/DBConfig.js');
const userSql = require('../db/userSql.js');
/* GET users listing. */
const pool = mysql.createPool(dbConfig.mysql);

const responseJson = (res,ret) => {
    if(typeof ret == undefined){
        res.json({
            'code':'-200',
            'msg':'操作失败！'
        })
    }else{
        res.json(ret)
    }
}

router.get('/showAllUsers',(req,res) => {
    pool.getConnection((err,connection) => {
        let params = req.params || req.query;
        connection.query(userSql.queryAll,(error,ret) => {
            if(ret){
                ret = {
                    code:'200',
                    msg:'查询成功！',
                    data:ret
                }
            }
            responseJson(res,ret)
            connection.release();
        })
    })
})
router.post('/addUser',(req,res) => {
    pool.getConnection((err,connection) => {
        let params = req.body;
        connection.query(userSql.insert,[params.name,params.age,params.gender],(error,ret) => {
            if(ret){
                ret = {
                    code:'200',
                    msg:'添加成功'
                }
            }
            responseJson(res,ret);
            connection.release();
        })
    })
})
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
