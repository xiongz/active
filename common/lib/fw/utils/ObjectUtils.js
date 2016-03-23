/**
 * Created by xiongze on 2015/8/10.
 */
define(function(){
    var ObjectUtils = {};
    ObjectUtils.isEmpty = function(obj){
        if(obj){
            return false;
        }else{
            return true;
        }
    }
    ObjectUtils.deepClone = function(obj){
        var newObj = {};
        $.extend(true,newObj, obj);
        return newObj;
    }
    /**
     * 判断两个对象的属性值是否一致
     * @param obj1
     * @param obj2
     * @param fields
     * @returns {boolean}
     */
    ObjectUtils.checkTwoObjectValue = function(obj1,obj2,fields){
        var isSame = true;
        fields.forEach(function(v,i){
            if(obj1[v] != obj2[v]){
                isSame = false;
                return;
            }
        });
        return isSame;
    }
    return ObjectUtils;
})