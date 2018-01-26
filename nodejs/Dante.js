/**
 * dante安装
 */

var path = require("path"),
    fs = require("fs"),
    command = require("./scrips/Command"),
    ipUtil = require("./scrips/IPUtil"),
    templateEngine = require("./scrips/TemplateEngine");

var cwd = path.dirname(__filename);
var danteConfigInstallPath = path.join('/etc','danted.conf');


var Dante = function(){
    var me = this;
    var url = 'ftp://ftp.inet.no/pub/socks/dante-1.4.2.tar.gz';
    var fileName = 'dante.tar.gz';
    var danteFilePath = path.join(cwd,'..',fileName);

    /**
     * 安装
     */
    this.install = function(){
       return new Promise( function(resolve, reject){
            me.installEnv().
                then(me.downLoadDante).
                then(me.unPackage).
                then(me.configDante).
                then(me.makeDante).
                then(function(){
                    resolve();
           });
       });
    }

    /**
     * 安装环境
     */
    this.installEnv = function () {
        return command.spawn('yum',['install','-y', 'gcc','openssl-devel','pcre-devel','zlib-devel','libtool','c++','pam-devel','pam' ] , cwd);
    }


    /**
     * 下载dante
     */
    this.downLoadDante = function(){
        return new Promise(function(resolve, reject){
            if (!fs.existsSync(danteFilePath)){
                //临时文件
                var tmpFile = danteFilePath+'.part';
                if (fs.existsSync(tmpFile)){
                    fs.unlinkSync(tmpFile);
                }
                command.spawn('curl',[url,'-o',tmpFile ])
                    .then(function(){
                        fs.renameSync(tmpFile,danteFilePath);
                        resolve();
                    })
            }else{
                resolve();
            }
        });
    }



    /**
     * 解压
     */
    this.unPackage = function(){
        return new Promise(function(resolve, reject){
            command.spawn('tar',['-zxvf',danteFilePath], path.join(cwd,'..') ).
            then(function(){
                var cwdPath = path.join(cwd,'..');
                var files = fs.readdirSync(cwdPath);
                var fileName = null;
                for (var i in files ){
                    var file = files[i];
                    if (file.indexOf('dante-') == 0  ){
                        fileName = path.join(cwdPath,file);
                        break;
                    }
                }
                resolve(fileName);
            });
        });
    }

    /**
     * 生成配置文件
     */
    this.configDante = function(dantePath){
        return new Promise(function(resolve, reject){
            var ip = ipUtil.guess();
            var content = fs.readFileSync(  path.join( cwd,'config','dante','sockd.conf' ) ).toString();
            content = templateEngine.make(content,{
                "ip":ip,
                "port":1080
            });
            fs.writeFileSync(danteConfigInstallPath,content);
            //sss
            resolve(dantePath);
        });
    }


    /**
     * 编译
     */
    this.makeDante = function(dantePath){
        return new Promise(function(resolve, reject){
            var installCmd = '';
            installCmd += './configure --with-sockd-conf='+danteConfigInstallPath +'\n';
            installCmd += 'make\n';
            installCmd += 'make install\n'
            var installSh = path.join(dantePath,'install'+new Date().getTime()+'.sh');
            fs.writeFileSync(installSh,installCmd);
            //执行脚本
            command.spawn('sh',[installSh] , dantePath).
            then(function(){
                console.log('make install finish.');
                //删除安装文件
                fs.unlinkSync(installSh);
                resolve();
            })
            resolve();
        });
    }


};
module.exports = new Dante();