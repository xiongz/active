/**
 * Created by xiongze on 2015/8/10.
 */
define(function(){
    var DateUtils = {};
    DateUtils.getDate = function(tm){
        var tt=new Date(parseInt(tm)).toLocaleString().replace(/年|月|\//g, "-").replace(/日/g, " ")
        return tt;
    }
    return DateUtils;
})