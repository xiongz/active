/**
 *
 * 1、此类负责初始化应用系统所有业务系统类: busMap
 * 2、此类负责初始化系统配置常量：EngineOption
 *
 *
 * Created by xiongze on 2015/8/10.
 */
define(["fw/HttpProxy","fw/Utils"],function(HttpProxy,Utils){
    var Engine = {};
    var busMap = {};
    //Engine变量设置
    Engine.config;// httpUrl:"",resUrl:"",isDebug:true
    Engine.mainView;
    Engine.globleVars = {};
    Engine.isInited = false;
    Engine.httpProxy = HttpProxy;
    Engine.utils = Utils;
    //局部变量定义
    // 引擎初始化
    Engine.init = function(config,buss,Constants){

        Engine.config=config;
        busMap = buss;
        Engine.constants=Constants;
        Engine.isInited = true;
    }

    //方法定义

    //
    //
    //日志打印输出
    Engine.log = function(message,arry){
        console.log(message);
        //if(Engine.isInited && Engine.EngineOptions.isDebug){
        //    if(arry&&arry.length>0){
        //        arry.forEach(function(v,i){
        //            message.replace("{"+i+"}",v);
        //        });
        //    }
        //    console.log(message);
        //}
    }

    //根据busName得到bus
    Engine.getBus = function(busName){
        if(Engine.isInited){
            return busMap[busName];
        }else{
            return null;
        }
    }
    //新增一个bus
    Engine.addBus = function(busName,bus){
        if(Engine.isInited){
            busMap[busName] = bus;
        }
    }


    return Engine;
});