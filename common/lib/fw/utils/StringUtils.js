/**
 * Created by xiongze on 2015/8/10.
 */
define(function(){
    var StringUtils = {};
    StringUtils = {
        isCellphone:function(data){
            var pattern = /^1[0-9]{10}$/;
            if(pattern.test(data)){
                return true;
            }else{
                return false;
            }
        },

        timer:function(){
            var ts = 60000;//计算剩余的毫秒数
            var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
            var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
            var mm = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数
            var ss = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数
            dd = checkTime(dd);
            hh = checkTime(hh);
            mm = checkTime(mm);
            ss = checkTime(ss);
            return ss+"秒后重新获取";
            //setInterval("timer()",1000);
        }
    }
    function checkTime(i)
    {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    return StringUtils;
})