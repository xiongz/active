require.config({
    baseUrl: 'common/lib',
    paths: {
        index:"../../controller/index"
    }
});

require(["fw/Engine","encrypt","index"],
    function (e,encrypt,index) {
        window.engine = e;
        engine.init({
            httpParam: {
                signature:"sdasd"
            },
            //httpUrl: "http://120.26.206.182:9000/gtbang/interface",
            //httpUrl: "http://192.168.1.182:8080/gtbang/interface",
            //httpUrl: "http://gongtoubang.com/gtbang/interface",
          //httpUrl: "http://192.168.1.14:8080/gtbang/interface",
            resUrl: "",
            isDebug: true
        },{
            index:index
        }, {});
        var eventLst = {};
        var stateLst = {};
        var mainView;
        var buyMask = mui.createMask(function(){  $("#buy-modal").removeClass("mui-active");});
        /**
         * 初始化
         */
        function init(){
            initEvent();
            initView();
            loadData();
        }
        init();
        /**
         * 初始化事件
         */
        function initEvent(){
            eventLst.clickTypeFunc = function(typeId,brand){
                mainView.curType = typeId;
                mainView.typeAndBrand.$model.forEach(function(v,i){
                    if(v.typeId==typeId){
                        mainView.brandLst = v.brand;
                        return;
                    }
                });
                eventLst.clickBrandFunc(mainView.brandLst[0].brandId);
            }
            eventLst.clickBrandFunc = function(brandId){
                mainView.curBrand = brandId;
                index.findShopAttribute({
                    promotionId:stateLst.promotionId,
                    typeId:mainView.curType,
                    brandId:brandId
                },function(data){
                    mainView.productDetail = data.data;
                    mui.previewImage();
                });
            }
            eventLst.downBottomFunc = function(){
                //var height = $("body").height();
                //$(window).scrollTop(height);
                window.location.href="#toflaw";
            }
            eventLst.selectBuyFunc = function(product){
                mainView.quantity = "1";
                $("#buy-modal .buy-modal").val(1);
                index.findShopInfo({shopId:product.shopId},function(data){
                    mainView.curStandard = data.data[0].standardId;
                    if(data.data[0].colorList.length>0){
                        mainView.curColor = data.data[0].colorList[0].colorName;
                        mainView.curGoodsId = data.data[0].colorList[0].productId;
                    }else{
                        mainView.curColor = "";
                    }
                    mainView.curProductInfo = data.data[0].colorList[0];
                    mainView.shopId = product.shopId;
                    mainView.specsList = data.data;
                    buyMask.show();
                    $("#buy-modal").addClass("mui-active");
                });
            }
            eventLst.hideCommonFunc = function (modal) {
                buyMask.close();
                $(modal).removeClass("mui-active");
            }
            eventLst.changeSpecsFunc = function(specs){
                mainView.curStandard = specs.standardId;
                if(specs.colorList.length>0){
                    mainView.curColor = specs.colorList[0].colorName;
                }else{
                    mainView.curColor = "";
                }
                findProductDetailAz(specs.colorList[0]);
            }
            eventLst.changeColorFunc = function(color){
                mainView.curColor = color.colorName;
                findProductDetailAz(color);
            }
            eventLst.addCartFunc = function(){
                if(mainView.quantity<=0){
                    mainView.quantity = 1;
                    alert("请至少加入一件商品！");
                    return;
                }
                index.addShopsToCartV22({
                    goodsList:JSON.stringify([{
                        goodsId:mainView.curGoodsId,
                        numAddOrUp:1,
                        quantity:mainView.quantity-0
                    }])
                },function(data){
                    var data = data.data;
                    mui.toast("已成功加入购物车");
                },"form");
            }
        }
        /**
         * 初始化模型
         */
        function initView(){
            engine.utils.uiUtils.reWindowUI();
            mainView = avalon.define({
                $id:"main",
                promotionImg:"",
                promotionDes:"",
                promotionImgFlaw:"",
                typeAndBrand:[],
                brandLst:[],
                curType:1,
                curBrand:1,
                specsList:[],
                curProductInfo:{},
                productDetail:[],
                curStandard:"",
                curColor:"",
                quantity:1,
                eventLst: eventLst
            });
            mainView.$watch("quantity",function(){
                if(!/^[0-9]*$/.test(mainView.quantity)){
                    var tempA = (mainView.quantity+"").match(/\d+(\.\d+)?/g).join("");
                    mainView.quantity = tempA;
                    $(".buy-btn-plus").prev().val(tempA);
                    return;
                }
                if(mainView.quantity<=1){
                    $(".buy-btn-minus").attr("disabled", "disabled");
                }else{
                    $(".buy-btn-minus").removeAttr("disabled");
                }
                if(mainView.quantity < 9999){
                    $(".buy-btn-plus").removeAttr("disabled");
                }
                if(mainView.quantity >= 9999){
                    var tempQ = (mainView.quantity+"").substring(0,4) - 0;
                    mainView.quantity = tempQ;
                    $(".buy-btn-plus").prev().val(tempQ);
                    if(tempQ=="9999"){
                        $(".buy-btn-plus").attr("disabled", "disabled");
                    }
                }
            });
        }

        /**
         * 加载数据
         */
        function loadData(){
            var token = engine.utils.requestUtils.QueryString("token");
            var cityId = engine.utils.requestUtils.QueryString("cityId");
            var vipId = engine.utils.requestUtils.QueryString("vipId");
            var promotionId = engine.utils.requestUtils.QueryString("promotionId");
            stateLst.promotionId = promotionId;
            if(token){
                engine.utils.sessionUtil.put("token",token);
            }
            if(vipId){
                engine.utils.sessionUtil.put("userId",vipId);
            }
            if(cityId){
                var cityName = cityId;
                if(cityId==73){
                    cityName = "上海市"
                }else if(cityId==74){
                    cityName="南京市";
                }
                engine.utils.sessionUtil.put("city",cityId+"|"+cityName);
            }
            index.getPromotion({promotionId:promotionId},function(data){
                var productTypeList = data.data.productTypeList;
                mainView.promotionImg = data.data.promotionImg||"common/images/banner.jpg";
                mainView.promotionImgFlaw = data.data.promotionImgFlaw||"common/images/banner.jpg";
                mainView.promotionDes = data.data.promotionDes||"";
                if(productTypeList.length>0){
                    mainView.typeAndBrand = productTypeList;
                    eventLst.clickTypeFunc(productTypeList[0].typeId,productTypeList[0].brand);
                }

            });
            loadExec();
        }

        /**
         * 查找单个商品详情
         */
        function findProductDetailAz(data){
            mainView.curProductInfo = data;
            mainView.curGoodsId = data.productId
//              $(".buy-btn-minus").attr("disabled","disabled");
            mainView.quantity = "1";
        }

        /**
         * 加载完成后执行
         */
        function loadExec(token){
            avalon.scan(document.body);
            $(document).ready(function () {
                $.goup({
                    trigger: 100,
                    bottomOffset: 20,
                    locationOffset: 20,
                    hideUnderWidth:100,
                    containerRadius:40,
                    containerColor:"rgba(0,0,0,0.5)",
                    titleAsText: true
                });
            });
            function appApi(){
                if(engine.utils.requestUtils.getHash()=='toflaw'){
                    window.location.href = "#toflaw";
                }
            }

            window.appApi = appApi;
            setTimeout(function(){
                appApi();
                engine.utils.eventUtils.onTouch($("#buy-modal")[0]);
            },1000);
        }
    });
