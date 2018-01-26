/**
 * 简单的模版引擎
 * @constructor
 */
var TemplateEngine = function () {

    /**
     * 字符串替换工具
     * @param source
     * @param searchValue
     * @param replaceValue
     * @returns {string}
     */
    var replaceAll = function( source , searchValue , replaceValue){
        return source.split(searchValue).join(replaceValue);
    }

    /**
     *  更换模版引擎的内容
     * @param content 模版内容
     * @param items   参数
     */
    this.make = function( content , items ){
        var result = content;
        for (var key in items){
            result = replaceAll(result , '${'+key+'}' ,items[key] );
        }
        return result;
    }
};

module.exports = new TemplateEngine();