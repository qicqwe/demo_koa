/**
 * @author maqiao
 * @date 2019/3/27 17:40
 */
var path = require('path');
//日志根目录
var baseLogPath = path.resolve(__dirname, '../logs');
//错误日志目录
var errorPath = "/error";
//错误日志文件名
var errorFileName = "error";
//错误日志输出完整路径
var errorLogPath = baseLogPath + errorPath + "/" + errorFileName;
//响应日志目录
var responsePath = "/response";
//响应日志文件名
var responseFileName = "response";
//响应日志输出完整路径
var responseLogPath = baseLogPath + responsePath + "/" + responseFileName;
module.exports = {
    //日志格式等设置
    appenders:
        {
            "rule-console": {"type": "console"},
            "errorLogger": {
                "type": "dateFile",
                "filename": errorLogPath,
                "pattern": "-yyyy-MM-dd.log",//"-yyyy-MM-dd-hh.log",
                "alwaysIncludePattern": true,
                "encoding":"utf-8",
                "maxLogSize": 1000,
                "numBackups": 3,
                "path":errorPath
            },
            "resLogger": {
                "type": "dateFile",
                "filename": responseLogPath,
                "pattern": "-yyyy-MM-dd.log",//"-yyyy-MM-dd-hh.log",
                "alwaysIncludePattern": true,
                "encoding":"utf-8",
                "maxLogSize": 1000,
                "numBackups": 3,
                "path":responsePath
            },
        },
    //供外部调用的名称和对应设置定义
    categories: {
        "default": {"appenders": ["rule-console"], "level": "all"},
        "resLogger": {"appenders": ["resLogger"], "level": "info"},
        "errorLogger": {"appenders": ["errorLogger"], "level": "error"},
        "http": {"appenders": ["resLogger"],"level": "info"}
    },
    "baseLogPath": baseLogPath
}