/**
 * 取消点击事件穿透
 */
if('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body)
	}, false)
}
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if(isAndroid) {
	$("head").append('<link rel="stylesheet" type="text/css" href="./css/productInfoAd.css"/>');
} else if(isiOS) {
	$("head").append('<link rel="stylesheet" type="text/css" href="./css/productInfo.css"/>');
	if(screen.height == 812 && screen.width == 375) {
		$("#main").css("padding-bottom", "2.67rem");
	}
}
//获取Url地址中userId参数
function getUrlParams(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式 
	var r = unescape(window.location.search).substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
};
var userID = getUrlParams("userId"),
	itemId = getUrlParams("itemId"),
	coupon = getUrlParams("coupon"),
	commission = getUrlParams("commission"),
	itemUrl = getUrlParams("itemUrl"),
	tmall = getUrlParams("tmall"),
	nativeUrl = getUrlParams("nativeUrl");
/**
 * 	产品性情	
 *  @params
 *  price1：最低最后成交价（非必需）
 *	price2：最高最后成交价（非必需）
 *	couponValue：最低优惠券面值（非必需）					
 *	返回商品信息：
 *	itemPrice 产品原价
 *	coupon 优惠券面额
 *	commission 按产品原价-优惠券面额成交以后的佣金 
 *	itemUrl：领券购买的H5链接
 *	name：商品名称
 *	nativeUrl：调用app打开的链接
 *	itemId：商品id，跟平台对应，是平台的商品ID
 *	sales：销量
 *	tmall:1是天猫 0不是天猫
 */
console.table({userId:userID,
				itemId:itemId,
				coupon:coupon,
				commission:commission,
				itemUrl:itemUrl,
				tmall:tmall,
				nativeUrl:nativeUrl})
ajaxUrl = "https://zhishun520.com/toutiaotv-api-home-1.0.0"
$.ajax({
	url: ajaxUrl + "/get/tao/product/",
	type: "GET",
	dataType: "json", //指定服务器返回的数据类型
	data: {
		itemId: itemId,
		userId: userID,
		random: Math.random()
	},
	success: function(data) {
		if(data.result.success !== "true") {
			if(userID == "5946") {
				$('body').html(JSON.stringify(data))
				return;
			}
		}
		$(".goods").show();
			coupon = getUrlParams("coupon"),
			commission = getUrlParams("commission"),
			itemUrl = "",
			tmall = getUrlParams("tmall"),
			nativeUrl = getUrlParams("nativeUrl");
		var data = data.data;
		var bannerImg = data.itemPicUrl,
			name = data.name,
			itemPrice = parseFloat(data.itemPrice),
			itemPicUrl = data.itemPicUrl,
			sales = data.sales,
			commission = (commission == undefined || commission == "") ? data.commission : commission,
			nativeUrl = (nativeUrl == undefined || nativeUrl == "") ? data.nativeUrl : nativeUrl,
			itemUrl = (itemUrl == undefined || itemUrl == "") ? data.itemUrl : itemUrl,
			coupon = (coupon == undefined || coupon == "") ? data.coupon : coupon,
			tmall = (tmall == undefined || tmall == "") ? data.tmall : tmall;
		//渲染banenr图
		$('.banner').css("background-image", `url(${bannerImg}_600x600q90.jpg)`);
		//领券
		$(".vouchers").html("领" + coupon + "元券购买");
		//佣金
		$(".tip").html("购买后返" + commission + "元");
		//价格
		$(".price").html((itemPrice - coupon).toFixed(2));
		if(tmall == 0) {
			//淘宝原价
			$(".itemPrice").html("淘宝价:￥<span style='text-decoration:line-through;'>" + itemPrice + "</span>");
			//名称
			$(".goodsName").html(`
			<img src="./img/type_taobaol_icon.png" alt="" />${name} 
			`);
		} else {
			//天猫原价
			$(".itemPrice").html("天猫价:￥<span style='text-decoration:line-through;'>" + itemPrice + "</span>");
			//名称
			$(".goodsName").html(`
			<img src="./img/type_tmall_icon.png" alt="" />${name} 
			`);
		}
		//销量
		$(".quantity").html("已售  " + sales);
		$(".goodsShare").html("分享");
		//绑定原生事件
		$(".goodsShare").on("click", {
			picUrl: bannerImg[0],
			itemId: itemId,
			nativeUrl: nativeUrl,
			itemUrl: itemUrl,
			itemId: itemId,
			coupon: coupon.toString(),
			commission: commission.toString(),
			itemPrice: itemPrice.toString(),
			name: name,
			sales: sales.toString(),
			itemPicUrl: itemPicUrl,
			tmall: tmall
		}, goodsShare)
		$(".vouchers").on("click", {
			nativeUrl: nativeUrl,
			itemUrl: itemUrl,
			itemId: itemId,
			itemPrice: itemPrice.toString(),
			name: name,
			coupon: coupon.toString(),
			sales: sales.toString(),
			itemPicUrl: itemPicUrl,
			tmall: tmall
		}, vouchers)
		//加载宝贝详情
		goodsInfo();
	},
	error: function(err) {
		if(userID == "5946") {
			$('body').html(JSON.stringify(err))
			return;
		}
	}
});

/**
 * 分享
 */
function goodsShare(e) {
	var data = JSON.stringify(e.data);
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isAndroid) {
		window.jsi.goodsShare(data)
	} else if(isiOS) {
		window.webkit.messageHandlers.goodsShare.postMessage(data);
	}
}
/**
 * 领券
 */
function vouchers(e) {
	console.log(e.data);
	var data = JSON.stringify(e.data);
	//console.log(data)
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(isAndroid) {
		window.jsi.vouchers(data)
	} else if(isiOS) {
		window.webkit.messageHandlers.vouchers.postMessage(data);
	}
}
/**
 * 宝贝详情
 */
function goodsInfo() {
	let goodsInfoAPIUrl = "select * from json where url=\"https://acs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/?data=%7B%22itemNumId%22%3A%22" + itemId + "%22%7D&qq-pf-to=pcqq.group\"";
	$.ajax({
		url: 'http://query.yahooapis.com/v1/public/yql',
		dataType: 'jsonp',
		data: {
			q: goodsInfoAPIUrl,
			format: "json"
		},
		success: function(d) {
			console.log("detail1", d)
			var goodsInfoAPI = d.query.results.json.data.item.moduleDescUrl;
			goodsInfoAPI = goodsInfoAPI.substring(2);
			$.ajax({
				url: 'http://query.yahooapis.com/v1/public/yql',
				dataType: 'jsonp',
				data: {
					q: "select * from json where url=\"http://" + goodsInfoAPI + "\"",
					format: "json"
				},
				success: function(d) {
					const goodsInfo = d.query.results.json.data;
					const reg = /^(detail_pic_)/;
					const detailsImgList = goodsInfo.children.filter(v => {
						return reg.test(v.ID);
					})
					detailsImgList.map((item) => {
						$(".goodsInfo").append(`<img class="lazyload" data-src="${item.params.picUrl}_600x600q90.jpg" />`)
					});
					lazyload();
				},
				error: function(error) {
					goodsInfo();
				}
			});
		},
		error: function(error) {
			goodsInfo();
		}
	});
}
/**
 * 宝贝详情end
 */
function Ajax(type, url, data, success, failed){
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    } 
    var type = type.toUpperCase();
    var random = Math.random(); 
    if(typeof data == 'object'){
        var str = '';
        for(var key in data){
            str += key+'='+data[key]+'&';
        }
        data = str.replace(/&$/, '');
    } 
    if(type == 'GET'){
        if(data){
            xhr.open('GET', url + '?' + data, true);
        } else {
            xhr.open('GET', url + '?t=' + random, true);
        }
        xhr.send(); 
    } else if(type == 'POST'){
        xhr.open('POST', url, true);
        // 如果需要像 html 表单那样 POST 数据，请使用 setRequestHeader() 来添加 http 头。
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    } 
    // 处理返回数据
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                success(xhr.responseText);
            } else {
                if(failed){
                    failed(xhr.status);
                }
            }
        }
    }
}