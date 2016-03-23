/**
 * Created by xiongze on 2015/8/10.
 */
define(function(){
    var EventUtils = {};
	var touchList =[];
    EventUtils.onTouch = function(dom){
			// ios���»���
			if(engine.utils.bowerUtils.versions.ios){
				var startY = 0;
				dom.addEventListener('touchstart', function(e) {
					if($(dom).find("iframe").length>0){
						return false;
					}
					$("body").scrollTop(0);
					startY = e.targetTouches[0].pageY;
				}, false);
				dom.addEventListener('touchmove', function(e) {

					if (e.targetTouches[0].pageY - startY < 0) {
						//if($(dom).scrollTop()>=$(window).height()-$(dom).height()){
						//	return false;
						//}
						dom.style.top = "auto";
						dom.style.bottom = "0";
					} else {
						dom.style.top = "0";
						dom.style.bottom = "auto";
					}
				}, false);
			}else{
				dom.addEventListener('touchstart', function(e) {
					$("body").scrollTop(0);
				}, false);
			}
    }
    return EventUtils;
})