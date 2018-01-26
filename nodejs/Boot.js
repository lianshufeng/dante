/**
 * 入口程序
 * @constructor
 */

var path = require("path"),
    dante = require("./Dante"),
    command = require("./scrips/Command");
var cwd = path.dirname(__filename);



var Boot = function(){

    var me = this;

    /**
     *  程序入口
     */
    var main = function(){
        //初始化环境
        installEnv().
        then(dante.install).
        then(me.finish);
    };

    /**
     * 初始化环境
     */
    var installEnv = function(){
        return command.spawn('yum',['install','-y','unzip','curl'] , cwd);
    }

    /**
     * 完成
     */
    var finish = function(){
        console.log('install finish .');
    }


    //入口
    main();
};
module.exports = new Boot();
