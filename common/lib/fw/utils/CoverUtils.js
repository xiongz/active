/**
 * Created by admin on 2016/2/21.
 */
define(["fw/utils/JsonUtils"],function (jsonUtils) {
    var host = "http://192.168.1.25:9080/gtb-interface/";
    var CoverUtils = {}

    CoverUtils.startCover = function(json){
        var startJson = {};
        startJson.platform = "h5";
        startJson.startTime = new Date().toLocalString();
        startJson.osVersionNo = window.navigator.userAgent;
        startJson.userId = "";
        startJson.imei = "";
        startJson.ipInner = "";
        startJson.ipInner = "";
        startJson.phoneName = "";
        startJson.netType = "";
        startJson.resolution = $(window).width()+"*"+$(window).height();
        startJson.appVersionNo = "v3";
        startJson.cityId = "h5";
        startJson.appName = "工头帮微信端";
        $.extend(startJson,json);
        var inJson = jsonUtils.jsonSort(startJson);
        $.post(host+"/cpClient/save", inJson, function(){});
    }
    CoverUtils.pageCover = function(json){
        var pageJson = {};
        pageJson.startTime = new Date().toLocalString();
        pageJson.property = "";
        pageJson.page = "";
        $.extend(pageJson,json);
        var inJson = jsonUtils.jsonSort(pageJson);
        $.post(host+"/cpPage/save",inJson,function(){});
    }
    CoverUtils.eventCover = function(json){
        var eventJson = {};
        eventJson.active = "";
        eventJson.startTime = new Date().toLocalString();
        eventJson.property = "";
        $.extend(eventJson,json);
        var inJson = jsonUtils.jsonSort0(eventJson);
        $.post(host+"/cpEvent/save",inJson,function(){});
    }



    return CoverUtils;
});