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
     * ��ȡ�
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
     * ��ȡ�
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
     * ��ȡ��Ʒ����
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
    // * ������ƷƷ��
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
     * ���빺�ﳵ
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