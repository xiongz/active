/**
 * Created by xiongze on 2015/8/10.
 */

define(["encrypt","fw/Utils"],function (encrypt,utils) {
    var HttpProxy = {};
    var getHost = function(){
        if(engine){
            //host = engine.config.httpUrl;

        }
        //var host = "http://192.168.1.182:8080/gtbang/interface";
        //var host = "http://api.gongtoubang.com/gtb-interface/gtbang/interface";
        var host = "http://192.168.1.25:9080/gtb-interface/gtbang/interface";
        return host;
    }

    HttpProxy.get = function(url,params,success,type){
    	engine.utils.uiUtils.showLoading();
        var paramsT = utils.jsonUtils.jsonSort(params);
        var $url = getHost() + url + "?dataParams=" + encodeURIComponent(JSON.stringify(paramsT));
        //+"&User-Agent=gtbang-app-web&timestamp="+Math.random()+"&signature="+signature
        if(type=="form"){
            $.ajax({
                url: getHost() + url,
                type:"GET",
                data:paramsT,
                dataType:"json",
                contentType:"application/x-www-form-urlencoded",
                success: function(data){
                    requestError(data,success);
                },
                error:function(a,b,c){
                	engine.utils.uiUtils.hideLoading();
                    httpError(a);
                }
            });
        }else{
            $.get($url,success);
        }
    }
    HttpProxy.post = function(url,params,success,type){
    	engine.utils.uiUtils.showLoading();
        var paramsT = utils.jsonUtils.jsonSort(params);
        var $url = getHost() + url;
        if(type=="form"){
            $.ajax({
                url: getHost() + url,
                type:"POST",
                data:paramsT,
                dataType:"json",
                contentType:"application/x-www-form-urlencoded",
                success: function(data){
                    requestError(data,success);
                },
                error:function(a,b,c){
                	engine.utils.uiUtils.hideLoading();
                    httpError(a);
                }
            });
        }else{
            $.post($url,$json,success);
        }
    }


    function httpError(a){
        if(a.status=="0"){
            alert("请检查网络连接");
        }else if(a.status=="404"){
            alert("网络地址错误");
        }else if(a.status=="500"){
            alert("服务器请求错误");
        }
    }

    function requestError(data,success){
        engine.utils.uiUtils.hideLoading();
        if(data.code=="000000"){
            success.call("",data);
        }else if(data.code=="500003"){
            success.call("",data,"500003");
        }else if(data.code=="500018"){
            success.call("",data,"500018");
        }else if(data.code=="500019"){
            success.call("",data,"500019");
        }else if(data.code=="200008"){
            engine.utils.sessionUtil.remove("token");
            window.location.reload();
            alert(data.desc);
        }else if(data.code=="400001"&&data.data.indexOf("token")>=0){
            alert("登录异常");
            window.location.reload();
        }else{
            alert(data.desc);
        }
    }
    //HttpProxy.upload = function(url,params){
    //
    //}
    //HttpProxy.download = function(url,params){
    //
    //}
    return HttpProxy;
})
