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
const userID = 1265;
$.ajax({
	url: "/api/list/tao/product",
	type: "GET",
	dataType: "json", //指定服务器返回的数据类型
	data: {
		userId: 1265,
		pageSize:1,
		sort:true,
		type:"new_activity",
		random: Math.random()
	},
	success: function(data) {
		/**
		 * 取消loading效果
		 */
		var loadingMask = document.getElementById('loadingDiv');
		loadingMask.parentNode.removeChild(loadingMask);
		var main = document.getElementById('main');
		main.style.opacity = '100';
		main.style.filter = 'alpha(opacity=100)';
		/**
		 * 取消loading效果end
		 */
		const res = data.data;
		let goodsType = ['./img/type_taobaol_icon.png',"./img/type_tmall_icon.png"]
		res.map((item,index)=>{
			const itemPrice = item.itemPrice,//原价
				coupon = item.coupon,
				commission = item.commission,
				itemUrl = item.itemUrl,
				nativeUrl = item.nativeUrl,
				itemId = item.itemId,
				name = item.name,
				tmall = item.tmall,
				sales = item.sales,
				itemPicUrl = item.itemPicUrl;
			const urlparams = {
				userId:userID,
				itemId:itemId,
				coupon:coupon,
				commission:commission,
				itemUrl:itemUrl,
				tmall:tmall,
				nativeUrl:nativeUrl
			}
			const strParams = jsonToUrlParams(urlparams)
			//console.log(strParams)
			$("#goods").append(
				`<a href="http://www.miaokun520.com/rebatecr/goodsInfo.html?${strParams}">
					<dl class="goods-item">
						<dt><img class="lazy" src="${itemPicUrl}"/></dt>
						<dd>
							<div class="title" style="background-image:url(${goodsType[tmall]})">${name}</div>	
							<div class="dd2">
								<div class="coupon">${coupon}元券</div>
								<div class="rebate">购买后返${commission}元</div>
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
				</a>`	
			)
		})
	},
	error: function(err) {
		console.log(err)
	}
});
function jsonToUrlParams(urlObj){
	let urlParamsString = '';
	Object.keys(urlObj).reduce((obj,key)=>{
		urlParamsString += `${key}=${urlObj[key]}&`
	},{})
	return urlParamsString
}
function numToSimple(number){	
	if(number>10000){		
		return (number/10000).toFixed(1)+"w"
	}else{
		return number
	}
}