/**
 * rem
 */
(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(!clientWidth) {
				return
			}
			if(clientWidth >= 640) {
				docEl.style.fontSize = 100 * (clientWidth / 375) + 'px'
			} else {
				docEl.style.fontSize = 100 * (clientWidth / 375) + 'px'
			}
		};
	if(!doc.addEventListener) {
		return
	}
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window);
var urlOnline = "https://zhishun520.com/toutiaotv-api-home-1.0.0";
var urlTest = "http://47.104.250.210:8083/toutiaotv-api-home-1.0.0";
var ajaxUrl = urlOnline;
var urlPrefix = "https://zhishun520.com/";
var urlPrefixTest = "http://47.104.250.210/";
if('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body)
	}, false)
}
var TJY = TJY || {};
TJY.v = 'v1701';
TJY.getUrlParams = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = unescape(window.location.search).substr(1).match(reg);
	if(r != null) {
		return unescape(r[2])
	}
	return null
};
TJY.getUrlParamsUnique = function(name) {
	var reg = new RegExp("(^|&&)" + name + "=([^&&]*)(&&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return decodeURI(r[2])
	}
	return null
};
TJY.checkBrowser = function() {
	return {
		mozilla: /firefox/.test(navigator.userAgent.toLowerCase()),
		webkit: /webkit/.test(navigator.userAgent.toLowerCase()),
		opera: /opera/.test(navigator.userAgent.toLowerCase()),
		msie: /msie/.test(navigator.userAgent.toLowerCase())
	}
};
TJY.pageHeight = function() {
	if(TJY.checkBrowser().msie) {
		return document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight
	} else {
		return self.innerHeight
	}
};
TJY.pageWidth = function() {
	if(TJY.checkBrowser().msie) {
		return document.compatMode == "CSS1Compat" ? document.documentElement.clientWidth : document.body.clientWidth
	} else {
		return self.innerWidth
	}
};
TJY.TreeSelector = function(item, data, rootId, defaultValue) {
	this._data = data;
	this._item = item;
	this._rootId = rootId;
	if(defaultValue) {
		this.defaultValue = defaultValue
	}
}
TJY.TreeSelector.prototype.createTree = function() {
	var len = this._data.length;
	for(var i = 0; i < len; i += 1) {
		if(this._data[i].pid == this._rootId) {
			this._item.options.add(new Option(" " + this._data[i].text, this._data[i].id));
			for(var j = 0; j < len; j += 1) {
				this.createSubOption(len, this._data[i], this._data[j])
			}
		}
	}
	if(this.defaultValue) {
		this._item.value = this.defaultValue
	}
}
TJY.TreeSelector.prototype.createSubOption = function(len, current, next) {
	var blank = "..";
	if(next.pid == current.id) {
		intLevel = 0;
		var intlvl = this.getLevel(this._data, this._rootId, current);
		for(a = 0; a < intlvl; a += 1) {
			blank += ".."
		}
		blank += "├-";
		this._item.options.add(new Option(blank + next.text, next.id));
		for(var j = 0; j < len; j += 1) {
			this.createSubOption(len, next, this._data[j])
		}
	}
};
TJY.TreeSelector.prototype.getLevel = function(datasources, topId, currentitem) {
	var pid = currentitem.pid;
	if(pid != topId) {
		for(var i = 0; i < datasources.length; i += 1) {
			if(datasources[i].id == pid) {
				intLevel += 1;
				this.getLevel(datasources, topId, datasources[i])
			}
		}
	}
	return intLevel
};
TJY.multSelect = function(opts) {
	var e1 = document.getElementById(opts.left);
	var e2 = document.getElementById(opts.right);
	for(var i = 0; i < e1.options.length; i += 1) {
		if(e1.options[i].selected) {
			var e = e1.options[i];
			e2.options.add(new Option(e.text, e.value));
			e1.remove(i);
			i = i - 1
		}
	}
	document.getElementById(opts.val).value = getValue(document.getElementById(opts.vtarget));

	function getValue(geto) {
		var ids = [];
		for(var i = 0; i < geto.options.length; i += 1) {
			ids.push(geto.options[i].value)
		}
		return ids.join(',')
	}
};
TJY.digitalOnly = function(obj) {
	obj.value = obj.value.replace(/\D/g, "")
};
TJY.getScrollTop = function() {
	var scrollTop = 0;
	if(document.documentElement && document.documentElement.scrollTop) {
		scrollTop = document.documentElement.scrollTop
	} else if(document.body) {
		scrollTop = document.body.scrollTop
	}
	return scrollTop
};
TJY.getScrollHeight = function() {
	return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
};
TJY.isNumberKey = function(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if(charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false
	} else {
		return true
	}
};
TJY.isNumberdoteKey = function(evt) {
	var e = evt || window.event;
	var srcElement = e.srcElement || e.target;
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if(charCode > 31 && ((charCode < 48 || charCode > 57) && charCode != 46)) {
		return false
	} else {
		if(charCode == 46) {
			var s = srcElement.value;
			if(s.length == 0 || s.indexOf(".") != -1) {
				return false
			}
		}
		return true
	}
};
TJY.isNumberCharKey = function(evt) {
	var e = evt || window.event;
	var srcElement = e.srcElement || e.target;
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if((charCode >= 48 && charCode <= 57) || (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode == 8) {
		return true
	} else {
		return false
	}
};
TJY.isChinese = function(obj, isReplace) {
	var pattern = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/i;
	if(pattern.test(obj.value)) {
		if(isReplace) {
			obj.value = obj.value.replace(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/ig, "")
		}
		return true
	}
	return false
};
Number.prototype.toFixed = function(exponent) {
	return parseInt(this * Math.pow(10, exponent) + 0.5) / Math.pow(10, exponent)
};
TJY.isUserName = function(evt) {
	var evt = evt || window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if((charCode == 95 || charCode == 46 || charCode == 64) || (charCode >= 48 && charCode <= 57) || (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode == 8) {
		return true
	} else {
		return false
	}
};
TJY.isEmail = function(v) {
	var tel = new RegExp("^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$");
	return(tel.test(v))
};
TJY.isTel = function(v) {
	var tel = new RegExp("^[[0-9]{3}-|\[0-9]{4}-]?(\[0-9]{8}|[0-9]{7})?$");
	return(tel.test(v))
};
TJY.isPhone = function(v) {
	var tel = new RegExp("^[1][0-9]{10}$");
	return(tel.test(v))
};
TJY.isUrl = function(str) {
	if(str == null || str == "") {
		return false
	}
	var result = str.match(/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\’:+!]*([^<>\"])*$/);
	if(result == null) {
		return false
	}
	return true
};
TJY.getTimeDiff = function(startTime, endTime, diffType) {
	startTime = startTime.replace(/-/g, "/");
	endTime = endTime.replace(/-/g, "/");
	diffType = diffType.toLowerCase();
	var sTime = new Date(startTime);
	var eTime = new Date(endTime);
	var divNum = 1;
	switch(diffType) {
		case "second":
			divNum = 1000;
			break;
		case "minute":
			divNum = 1000 * 60;
			break;
		case "hour":
			divNum = 1000 * 3600;
			break;
		case "day":
			divNum = 1000 * 3600 * 24;
			break;
		default:
			break
	}
	return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum))
};
TJY.cutStr = function(str, len) {
	if(!str || str == '') {
		return ''
	}
	var strlen = 0;
	var s = "";
	for(var i = 0; i < str.length; i += 1) {
		if(strlen >= len) {
			return s + "..."
		}
		if(str.charCodeAt(i) > 128) {
			strlen += 2
		} else {
			strlen += 1
		}
		s += str.charAt(i)
	}
	return s
};
TJY.checkChks = function(obj, cobj) {
	$(cobj).each(function() {
		$(this)[0].checked = obj.checked
	})
};
TJY.getChks = function(obj) {
	var ids = [];
	$(obj).each(function() {
		if($(this)[0].checked) {
			ids.push($(this).val())
		}
	});
	return ids
};
TJY.showHide = function(t, str) {
	var s = str.split(',');
	if(t) {
		for(var i = 0; i < s.length; i += 1) {
			$(s[i]).show()
		}
	} else {
		for(var i = 0; i < s.length; i += 1) {
			$(s[i]).hide()
		}
	}
	s = null
};
TJY.blank = function(str, defaultVal) {
	if(str == '0000-00-00') {
		str = ''
	}
	if(str == '0000-00-00 00:00:00') {
		str = ''
	}
	if(!str) {
		str = ''
	}
	if(typeof(str) == 'null') {
		str = ''
	}
	if(typeof(str) == 'undefined') {
		str = ''
	}
	if(str == '' && defaultVal) {
		str = defaultVal
	}
	return str
};
TJY.limitDecimal = function(obj, len) {
	var s = obj.value;
	if(s.indexOf(".") > -1) {
		if((s.length - s.indexOf(".") - 1) > len) {
			obj.value = s.substring(0, s.indexOf(".") + len + 1)
		}
	}
	s = null
};
TJY.getParams = function(obj) {
	var params = {};
	var chk = {},
		s;
	$(obj).each(function() {
		if($(this)[0].type == 'hidden' || $(this)[0].type == 'number' || $(this)[0].type == 'tel' || $(this)[0].type == 'password' || $(this)[0].type == 'select-one' || $(this)[0].type == 'textarea' || $(this)[0].type == 'text') {
			params[$(this).attr('id')] = $.trim($(this).val())
		} else if($(this)[0].type == 'radio') {
			if($(this).attr('name')) {
				params[$(this).attr('name')] = $('input[name=' + $(this).attr('name') + ']:checked').val()
			}
		} else if($(this)[0].type == 'checkbox') {
			if($(this).attr('name') && !chk[$(this).attr('name')]) {
				s = [];
				chk[$(this).attr('name')] = 1;
				$('input[name=' + $(this).attr('name') + ']:checked').each(function() {
					s.push($(this).val())
				});
				params[$(this).attr('name')] = s.join(',')
			}
		}
	});
	chk = null, s = null;
	return params
};
TJY.setValue = function(name, value) {
	var first = name.substr(0, 1),
		input, i = 0,
		val;
	if("#" === first || "." === first) {
		input = $(name)
	} else {
		input = $("[name='" + name + "']")
	}
	if(input.eq(0).is(":radio")) {
		input.filter("[value='" + value + "']").each(function() {
			this.checked = true
		})
	} else if(input.eq(0).is(":checkbox")) {
		if(!$.isArray(value)) {
			val = [];
			val[0] = value
		} else {
			val = value
		}
		for(i = 0, len = val.length; i < len; i += 1) {
			input.filter("[value='" + val[i] + "']").each(function() {
				this.checked = true
			})
		}
	} else {
		input.val(value)
	}
};
TJY.setValues = function(obj) {
	var input, value, val;
	for(var key in obj) {
		if($('#' + key)[0]) {
			TJY.setValue('#' + key, obj[key])
		} else if($("[name='" + key + "']")[0]) {
			TJY.setValue(key, obj[key])
		}
	}
};
TJY.parse_url = function(url) {
	var parse = url.match(/^(?:([a-z]+):\/\/)?([\w-]+(?:\.[\w-]+)+)?(?::(\d+))?([\w-\/]+)?(?:\?((?:\w+=[^#&=\/]*)?(?:&\w+=[^#&=\/]*)*))?(?:#([\w-]+))?$/i);
	parse || $.error("url格式不正确！");
	return {
		"scheme": parse[1],
		"host": parse[2],
		"port": parse[3],
		"path": parse[4],
		"query": parse[5],
		"fragment": parse[6]
	}
};
TJY.parse_str = function(str) {
	var value = str.split("&"),
		vars = {},
		param;
	for(var i = 0; i < value.length; i += 1) {
		param = value[i].split("=");
		vars[param[0]] = param[1]
	}
	return vars
};
TJY.numToSimple = function(number){	
	if(number>10000){		
		return (number/10000).toFixed(1)
	}else{
		return number
	}
}
