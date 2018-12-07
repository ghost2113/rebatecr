 var channel = getUrlParams("channel"); //深度链接渠道
 var invitation = getUrlParams("invitation"); //标题\

 linkedme.init("67aadce5ce66282a36433f6e352825cb", {
 	type: "live"
 }, null);
 var data = {};
 data.type = "live"; //表示现在使用线上模式,如果填写"test", 表示测试模式.【可选】
 data.feature = "功能名称"; // 自定义深度链接功能，多个用逗号分隔，【可选】
 data.stage = "阶段名称"; // 自定义深度链接阶段，多个用逗号分隔，【可选】
 data.channel = "渠道链接"; // 自定义深度链接渠道，多个用逗号分隔，【可选】
 data.tags = ""; // 自定义深度链接标签，多个用逗号分隔，【可选】
 data.ios_custom_url = ""; // 自定义iOS平台下App的下载地址，如果是AppStore的下载地址可以不用填写，需填写http或https【可选】
 data.ios_direct_open = ""; //未安装情况下，设置为true为直接打开ios_custom_url，默认为false【可选】
 data.android_custom_url = ""; // 自定义安卓平台下App的下载地址，需填写http或https【可选】
 data.android_direct_open = ""; //设置为true，所有情况下跳转android_custom_url，默认为false【可选】
 var value1 = channel;
 var value2 = invitation;
 data.params = '{"channel":"' + value1 + '","invitation":"' + value2 + '"}'; //注意单引号和双引号的位置
 linkedme.link(data, function(err, response) {
 	if(err) {
 		// 生成深度链接失败，返回错误对象err
 	} else {
 		/**
 		 * 立即领取
 		 */
 		$("#linkedME").attr("href", response.url);
 	}
 }, false);
 
//获取Url地址中userId参数
function getUrlParams(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式 
	var r = unescape(window.location.search).substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}