/**
 * Created by xiongze on 2015/12/07.
 */

define(function(){
    var getPromotion   = "/promotion/getPromotion";
    var findShopAttribute   = "/findShopAttribute";
    var findShopInfo   = "/findShopInfo";
    var addShopsToCartV22 = "/addShopsToCartV22";
    var controller = {};

    /**
     * 获取活动
     * @param callback
     */
    controller.getPromotion = function(json,callback){
        engine.httpProxy.get(
            getPromotion, json,
            function(data) {
                callback.call("",data);
            },
            "form"
        )
    }

    /**
     * 获取活动
     * @param callback
     */
    controller.findShopAttribute = function(json,callback){
        engine.httpProxy.get(
            findShopAttribute, json,
            function(data) {
                callback.call("",data);
            },
            "form"
        )
    }

    /**
     * 获取商品详情
     * @param callback
     */
    controller.findShopInfo = function(json,callback){
        engine.httpProxy.get(
            findShopInfo, json,
            function(data) {
                callback.call("",data);
            },
            "form"
        )
    }

    ///**
    // * 加载商品品牌
    // * @param callback
    // */
    //controller.findTypeAndBrand = function(callback){
    //    engine.httpProxy.get(
    //        findTypeAndBrand, {},
    //        function(data) {
    //            callback.call("",data);
    //        },
    //        "form"
    //    )
    //}

    /**
     * 加入购物车
     * @param productDetailList
     * @param callback
     */
    controller.addShopsToCartV22 = function(json,callback){
        engine.httpProxy.post(
            addShopsToCartV22, json,
            function(data) {
                callback.call("",data);
            },
            "form"
        )
    }

    return controller;
});