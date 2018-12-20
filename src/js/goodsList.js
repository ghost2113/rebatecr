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
//公共变量。
var userID = TJY.getUrlParams("userId");
var $renderDom = $("#goodsList");
var goodsLoadEnd = false;
var searchLoadEnd = false;
var pageNo1 = 0; //第几页。
var pageNo2 = 0; //第几页。
var apiurl = "/api/list/tao/product";
var itemIndex = 0;
var keywords = ""; //搜索商品关键词

function requestType(type) {
	if(type == 0) {
		pageNo1 = 0;
		if(!goodsLoadEnd) {
			$(".searchList").hide();
			$(".goodsList").show();
			$(".iconfont1").hide();
			itemIndex = 0;
			dropload.unlock();
			dropload.noData(false);
		} else {
			// 锁定
			dropload.lock('down');
			dropload.noData();
		}
	} else if(type == 1) {
		keywords = $.trim($(".goodsname").val());
		if(keywords == "") {
			showMask("请输入你想搜索的商品标题或关键词")
			return;
		}
		pageNo2 = 0;
		$(".goodsList").hide();
		$("#searchList").html("");
		$(".searchList").show();
		if(!searchLoadEnd) {
			itemIndex = 1;
			dropload.unlock();
			dropload.noData(false);
		} else {
			// 锁定
			dropload.lock('down');
			dropload.noData();
		}
	}
	// 重置
	dropload.resetload();
}
var dropload = $('#main').dropload({
	scrollArea: window,
	domDown: { // 下方DOM
		domClass: 'dropload-down',
		domRefresh: '<div class="dropload-refresh"></div>',
		domLoad: '<div class="dropload-load"><span class="loading"></span>加载中</div>',
		// domNoData  : '<div class="dropload-noData" style="display:none;"></div>'
		domNoData: '<div class="dropload-noData">暂无数据</div>'
	},
	loadDownFn: function(me) {
		if(itemIndex == 0) {
			pageNo1++;
			$renderDom = $("#goodsList");
			apiurl = "https://zhishun520.com/toutiaotv-api-home-1.0.0/professional/product/list"; // 解锁
			var params = {
				userId: 1265,
				pageSize: 10,
				pageNo: pageNo1,
				random: Math.random()
			}
			goods(me, params);
		} else if(itemIndex == 1) {
			pageNo2++;
			var goodsname = $(".goodsname").val();
			$renderDom = $("#searchList");
			apiurl = "https://zhishun520.com/toutiaotv-api-home-1.0.0/professional/product/search";
			var params = {
				userId: 1265,
				pageSize: 10,
				pageNo: pageNo2,
				cid: "",
				keyWord: keywords,
				random: Math.random()
			}
			goods(me, params);
		}
	}
})

function goods(me, params) {
	$.ajax({
		url: apiurl,
		type: "GET",
		dataType: "json", //指定服务器返回的数据类型
		data: params,
		success: function(data) {
			showData(me, data)			
		},
		error: function(err) {
			// 即使加载出错，也得重置
			me.resetload();
		}
	})
}

function showData(me, data) {
	let res = data.data;
	let goodsType = ['./img/type_taobaol_icon.png', "./img/type_tmall_icon.png"];
	let len = res.length;
	let result = '';
	if(len > 0) {
		if(itemIndex == 1) {
			$(".iconfont1").show();
		}
		//渲染数据
		res.map((item, index) => {
			const itemPrice = item.itemPrice, //原价
				coupon = item.coupon,
				commission = item.commission,
				itemUrl = item.itemUrl,
				nativeUrl = item.nativeUrl,
				itemId = item.itemId,
				name = item.name,
				tmall = item.tmall,
				sales = item.sales,
				itemPicUrl = item.itemPicUrl,
				id = item.id;
			const urlparams = {
				userId: 5946,
				itemId: itemId,
				coupon: coupon,
				goBack:true,
				mall: tmall,
				commission: commission,
				itemUrl: itemUrl,
				nativeUrl: nativeUrl
			}
			const strParams = jsonToUrlParams(urlparams)
			result += /*id!==null?*/
				`<a href="http://www.miaokun520.com/rebatecr/goodsInfo.html?${strParams}">
					<dl class="goods-item">
						<dt><img class="lazyload" src="img/default.png" data-src="${itemPicUrl}_600x600q90.jpg" alt="图片加载失败"/></dt>
						<dd>
							<div class="title" style="background-image:url(${goodsType[tmall]})">${name}</div>	
							<div class="dd2">
								<div class="coupon">${coupon}元券</div>
								<div class="rebate"></div>
							</div>
							<div class="dd3">
								<div class="dd3-wrap">
									<div class="price">￥${(itemPrice-coupon).toFixed(2)}元</div>
									<div class="itemPrice"><delete>￥${itemPrice}</delete></div>
								</div>
								<div>
									<div class="sales">已售${numToSimple(sales)}</div>
								</div>								
							</div>
						</dd>
					</dl>				
				</a>`;
		})
		//渲染数据
	} else {
		if(pageNo1 == 1||pageNo1 == 2) {
			$(".dropload-down").hide();
			if(itemIndex==1){
				showMask("没有搜索到相关商品");
				requestType(0);
			}
		}
		if(itemIndex == 0) {
			goodsLoadEnd = true;
		} else if(itemIndex == 1) {
			searchLoadEnd = true;
		}
		me.lock(); // 锁定
		me.noData(); // 无数据
	}
	// 插入数据到页面，放到最后面
	$renderDom.append(result);
	//延迟加载图片
	lazyload();
	// 每次数据插入，必须重置
	me.resetload();
}

function jsonToUrlParams(urlObj) {
	let urlParamsString = '';
	Object.keys(urlObj).reduce((obj, key) => {
		urlParamsString += `${key}=${urlObj[key]}&`
	}, {})
	return urlParamsString
}

function numToSimple(number) {
	if(number > 10000) {
		return(number / 10000).toFixed(1) + "w"
	} else {
		return number
	}
}

function hideMask() {
	$(".mask").hide();
}

function showMask(text) {
	$(".mask").show();
	if(text) {
		$(".content").html(text);
	}
}
$(window).scroll(function() {
	if($(window).scrollTop() > 100) {
		$("#back-to-top").fadeIn(1500);
	} else {
		$("#back-to-top").fadeOut(1500);
	}
});

//当点击跳转链接后，回到页面顶部位置
$("#back-to-top").click(function() {
	//$('body,html').animate({scrollTop:0},1000);
	if($('html').scrollTop()) {
		$('html').animate({
			scrollTop: 0
		}, 1000);
		return false;
	}
	$('body').animate({
		scrollTop: 0
	}, 1000);
	return false;
});
