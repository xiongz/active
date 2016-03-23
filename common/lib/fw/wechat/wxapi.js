/**
 * Created by xiongze on 2015/10/16.
 */
define(["encrypt"],function(encrypt){
    var weixinH5Login = "http://api.gongtoubang.com/gtb-interface/gtbang/interface/weixinH5Login?User-Agent=gtbang-app-web";
    //var weixinH5Login = "http://120.26.206.182:9000/gtbang/interface/weixinH5Login";
    var wxapi = {};
    /**
     *  ΢�ŷ���
     */
    wxapi.share = function(shareInfo) {
        /*
         * ע�⣺
         * 1. ���е�JS�ӿ�ֻ���ڹ��ںŰ󶨵������µ��ã����ںſ�������Ҫ�ȵ�¼΢�Ź���ƽ̨���롰���ں����á��ġ��������á�����д��JS�ӿڰ�ȫ����
         * 2. ������� Android ���ܷ����Զ������ݣ��뵽�����������µİ�ǰ�װ��Android �Զ������ӿ������� 6.0.2.58 �汾�����ϡ�
         * 3. �������⼰���� JS-SDK �ĵ���ַ��http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
         *
         * ������������������ĵ�����¼5-������󼰽���취�����������δ�ܽ����ͨ����������������
         * �����ַ��weixin-open@qq.com
         * �ʼ����⣺��΢��JS-SDK��������������
         * �ʼ�����˵�����ü��������������������ڣ��������������������ĳ������ɸ��Ͻ���ͼƬ��΢���Ŷӻᾡ�촦����ķ�����
         */
        $.get("http://127.0.0.1:9081/wechat/getTicket?params={%22appcode%22:%22sht%22}",function(data){
            var ticket = data.ticket;
            wx.config({
                debug: false,
                appId: 'appId',
                timestamp: 1431682412,
                nonceStr: 'Vh4fL91I4IPGu4Nx',
                signature: encrypt.sha1("jsapi_ticket="+ticket+"&noncestr=Vh4fL91I4IPGu4Nx&timestamp=1431682412&url="+window.location.href.split("#")[0]),
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo'
                ]
            });
            wx.ready(function () {
                wx.onMenuShareAppMessage({
                    title: '',
                    desc: '',
//        link: 'index.html',
                    imgUrl: '',
                    trigger: function (res) {
                        // ��Ҫ������trigger��ʹ��ajax�첽�����޸ı��η�������ݣ���Ϊ�ͻ��˷��������һ��ͬ����������ʱ��ʹ��ajax�Ļذ�ỹû�з���
//          alert('�û�������͸�����');
                    },
                    success: function (res) {
//          alert('�ѷ���');
                    },
                    cancel: function (res) {
//          alert('��ȡ��');
                    },
                    fail: function (res) {
//          alert(JSON.stringify(res));
                    }
                });
                wx.onMenuShareTimeline({
                    title: '',
                    desc: '',
//        link: 'index.html',
                    imgUrl: '',
                    trigger: function (res) {
                        // ��Ҫ������trigger��ʹ��ajax�첽�����޸ı��η�������ݣ���Ϊ�ͻ��˷��������һ��ͬ����������ʱ��ʹ��ajax�Ļذ�ỹû�з���
//          alert('�û�������?����Ȧ');
                    },
                    success: function (res) {
//          alert('�ѷ���');
                    },
                    cancel: function (res) {
//          alert('��ȡ��');
                    },
                    fail: function (res) {
//          alert(JSON.stringify(res));
                    }
                });
            });
            wx.error(function (res) {
//        alert(res.errMsg);
            });
        });
    }
    /**
     * ���ÿͻ���֧��
     * @param callpay
     */
    wxapi.callpay = function(prePayData,callback,id) {
    	if (typeof WeixinJSBridge == "undefined")
	    {
	        if (document.addEventListener)
	        {
	            document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
	        }
	        else if (document.attachEvent)
	        {
	            document.attachEvent('WeixinJSBridgeReady', jsApiCall);
	            document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
	        }    
	        callback.call("","fail",id);
	    }else{
	    	jsApiCall();
	    }
	    
	    function jsApiCall(){
	    	WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId": "wx311d702a2f888505",     //���ں���ƣ����̻�����
                "timeStamp": prePayData.timeStamp,         //ʱ�������1970������������
                "nonceStr": prePayData.nonceStr, //���
                "package": "prepay_id=" + prePayData.prepayId,
                "signType": "MD5",         //΢��ǩ��ʽ��
                "paySign": prePayData.sign //΢��ǩ��
            } ,
            function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                	callback.call("","ok",id);
                }  
                if (res.err_msg == "get_brand_wcpay_request:cancel") {
                	callback.call("","cancel",id);
                } 
                if (res.err_msg == "get_brand_wcpay_request:fail") {
                	callback.call("","fail",id);
                } 
            }
        );
	    }
        
    }

    wxapi.startlogin = function(state){
        if(!state){
            var scopeUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
                "appid=wx311d702a2f888505" +
                "&redirect_uri="+encodeURIComponent(weixinH5Login)+
                "&response_type=code" +
                "&scope=snsapi_userinfo" +
                "&state=STATE#wechat_redirect";
        }else{
            var scopeUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
                "appid=wx311d702a2f888505" +
                "&redirect_uri="+encodeURIComponent(weixinH5Login)+
                "&response_type=code" +
                "&scope=snsapi_userinfo" +
                "&state=" +state+
                "#wechat_redirect";
        }
        window.location.href = scopeUrl;
    }

    wxapi.startHiddenlogin = function(userid){
        var scopeUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
            "appid=wx311d702a2f888505" +
            "&redirect_uri="+encodeURIComponent(weixinH5Login)+
            "&response_type=code" +
            "&scope=snsapi_base" +
            "&state=" +"id:"+userid+";ishiddenlogin:true"+
            "#wechat_redirect";
        window.location.href = scopeUrl;
    }
    return wxapi;
})