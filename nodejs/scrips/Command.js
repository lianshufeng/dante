var exec = require('child_process').execSync,
    spawn = require('child_process').spawn;

//数组到命令行
var toCommandLine = function(parameters){
    var cmds = "";
    for (var i in parameters){
        cmds += parameters[i];
        cmds += " "
    }
    return cmds;
}


/*
* 追加参数到数组
*/
exports.append=function( arr , cmd , isPath ){
    //替换符号
    var val = cmd.split("\\").join("/");
    return arr.push(val);
}

/*
* 调用方法
* 脚本名
* 参数数组
*/
exports.exec=function( parameters,cwd){
    var cmds = toCommandLine(parameters);
    var rt ;
    if(cwd){
        rt = exec(cmds,{"cwd":cwd});
    }else{
        rt = exec(cmds);
    }
    return rt.toString();
}


exports.toCommandLine = toCommandLine;


/**
 * 异步执行命令行
 * @returns {Promise}
 */
exports.spawn = function(command,args,cwd){
    return new Promise(function( resolve, reject ){
        var info = '',
            error='';
        var process = spawn(command,args,{ 'cwd' : cwd });


        var logInfo = function(info){
            if (info.substring(info.length-1,info.length) =='\n'  ){
                info = info.substring(0,info.length-1);
            }
            console.log(info);
        }

        //打印控制台
        process.stdout.on('data', function (data) {
            var result = data.toString();
            logInfo(result);
            info+=result;

        });

        // 打印控制台
        process.stderr.on('data', function (data) {
            var result = data.toString();
            logInfo(result);
            console.error(result);
        });


        // 命令行执行完毕
        process.on('exit', function (code, signal) {
            resolve(info,error);
        });
    });
};

