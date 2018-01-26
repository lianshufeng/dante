/**
 * *获取本机外网IP的工具
 */
// var request = require("request");


var os = require('os');

var IPUtil = function(){
    // /**
    //  * 获取本机ip
    //  */
    // this.get = function(){
    //     return new Promise(function( resolve , reject ){
    //         request('http://2017.ip138.com/ic.asp', function (error, response, body) {
    //             if (!error && response.statusCode == 200) {
    //                 var start = body.indexOf('[');
    //                 var end = body.indexOf(']',start+1);
    //                 resolve(body.substring(start+1,end));
    //             }
    //         });
    //
    //     });
    // }


    /**
     * 获取本机的所有ip
     * @returns {any[]}
     */
    this.get = function(){
        var result = new Array();
        var networks = os.networkInterfaces();
        for(var name in  networks){
            var netWorkCard = networks[name];
            for (var i in netWorkCard){
                if (netWorkCard[i].family== 'IPv4'){
                    result.push(netWorkCard[i].address);
                }
            }
        }
        return result;
    }


    /**
     * 猜一个本地网IP
     * @returns {*}
     */
    this.guess = function(){
        var ips = this.get();
        for (var i in ips){
            var ipArr = ips[i].split(".");
            if (ipArr.length != 4 ){
                continue;
            }
            if (ipArr[0]=='10'|| ipArr[0]=='192'|| ipArr[0]=='172'){
                return ips[i];
            }
        }
        return null;
    }

}


module.exports = new IPUtil();
