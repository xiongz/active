/**
 * Created by xiongze on 2015/8/10.
 */
define(function(){
    var MathUtils = {};
    MathUtils.random = function(start, end){
        return start + Math.floor(Math.abs(end - start) * Math.random())
    };
    return MathUtils;
})