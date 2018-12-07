(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(!clientWidth) return;
			if(clientWidth >= 640) {
				/*docEl.style.fontSize = '100px';*/
				docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
			} else {
				docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
			}
		};
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
	console.log(1111111111);
})(document, window);
	/**
	 * 接口地址
	 */
	var urlOnline = "https://zhishun520.com/zaotoutiao-api-home-1.0.0";
	var urlTest = "http://47.104.250.210:8083/zaotoutiao-api-home-1.0.0";
	var ajaxUrl = urlOnline;
	/**
	 * 地址前缀
	 */
	var urlPre = "https:zhishun520.com";
