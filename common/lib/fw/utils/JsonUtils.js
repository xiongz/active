/**
 * Created by xiongze on 2015/8/10.
 */
define(["encrypt"],function(encrypt){
    var JsonUtils = {};
    JsonUtils.jsonSort = function(params){
        var com_params = {
            cityId:!engine.utils.sessionUtil.get("city")?"73":engine.utils.sessionUtil.get("city").split("|")[0]||"73",
            token:engine.utils.sessionUtil.get("token"),
            "User-Agent":"gtbang-app-web",
            timestamp:Math.random(),
            vipId:engine.utils.sessionUtil.get("userId")
        }
        $.extend(params,com_params);
        var signatureStr="";
        var signKey = [];
        for(var key in params){
            signKey.push(key);
        }
        signKey.sort();
        for(var i=0;i<signKey.length;i++){
            signatureStr += signKey[i]+((params[signKey[i]]==null||params[signKey[i]]==undefined)?"":params[signKey[i]]);
        }
        var signature = encrypt.md5(signatureStr.toUpperCase()+"va9FtwZnxHDSiLsJO9z7kgJ7OKMTl5k5RzfId3hwfz6FolQm/L18VilQCSuMSBp0DPVEmgdFtxhcT3qYyCHAjw==");
        var tempJson = {
            signature:signature
        }
        $.extend(params,tempJson);

        return params;
    }
    return JsonUtils;
})