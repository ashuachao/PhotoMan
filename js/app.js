window.onload = function(){
	var app = new App();
	app.init();
}
// 定义app类 用于启动
function App(){
		this.addCata = Bang.$(".addCata");
		this.cataList = Bang.$(".cataUl");
		this.editCata = Bang.$(".editCata");
		this.delCata = Bang.$(".delCata");
		this.PhotoList = Bang.$(".show");
		this.uploader = Bang.$(".upload");
		this.handleCata = Bang.$(".handlerCata")
		this.addCataShow = Bang.$(".addCataShow");
		this.uploadShow = Bang.$(".uploadShow");
		this.handleCataShow = Bang.$(".handleCataShow");
		this.init = function() {
			Ui.init();
			Photo.init();
			Storage.init();
			CataList.init();
			Uploader.init();
		}	
};
// Ui类 用于view层的操作
var Ui = {};
Ui.init = function() {}
// 展示分类方法 接受来自localstorage的数据
Ui.showCata = function(item) {
	
}
// hover新建相册的方法
Ui.addCataHover = function() {
	Bang.addEvent(app.addCata,"mouseover",function() {
		Bang.addClass(app.addCata,"addCataHover");
	});
	Bang.addEvent(app.addCata,"mouseout",function() {
		Bang.removeClass(app.addCata,"addCataHover");
	});
}
// hoverCataList的方法
Ui.cataListHover = function(cataListLi) {
	var cataLists = app.cataList.getElementsByTagName("li");
	for (var i=0,cataList;cataList = cataLists[i++];) {
		Bang.removeClass(cataList,"cataListHover")
	}
	Bang.addClass(cataListLi,"cataListHover");
	app.handlerCata.style.visiablity = "none";

}
// show添加相册页的方法
Ui.addCataShow = function() {
	app.addCataShow.style.display = "block";
}
// 
// 展示图片方法
Ui.showPhoto = function() {

}
// hover uploader方法
Ui.uploadHover = function() {
	Bang.addEvent(app.uploader,"mouseover",function() {
		Bang.addClass(app.uploader,"uploadHover");
	});
	Bang.addEvent(app.uploader,"mouseout",function() {
		Bang.removeClass(app.uploader,"uploadHover");
	}); 
}
// show上传照片页的方法
Ui.uploadShow = function() {
	app.uploadShow.style.display = "block";
}
// showhandleCata页的方法
Ui.handleCataShow = function() {
	app.handleCataShow.style.display = "block";
}
// showeditPhoto的方法
Ui.editPhotoShow = function() {

}
// showemovePhoto的方法
Ui.movePhotoShow = function() {

}
// showdelPhoto页的方法
Ui.delPhotoShow = function() {

}

// Photo类 用于数据层Photo的操作
var Photo = {};
Photo.init = function() {}
// Photo上传功能
Photo.upload = function() {
	Bang.addEvent(app.uploader,"click",function() {
		Ui.uploadShow();
		Uploader.init();
	})
}
// 编辑图片的方法
Photo.editPhoto = function() {

}
// move图片的方法
Photo.movePhoto = function() {

}
// del图片的方法
Photo.delPhoto = function() {

}

// Storage类 用于localstorage的操作
var Storage = {};
Storage.init = function() {}
// 储存信息的方法
Storage.setItem = function() {

}
// 得到信息的方法
Storage.getItem = function() {

}
// 删除信息的方法
Storage.removeItem = function() {

}
// CataList类 用于数据层CataList的操作
var CataList = {};
CataList.init = function() {}
// 点击Cata时候的操作
CataList.clickCata = function() {

}
// 点击新建相册的操作
CataList.clickAddCata = function() {

}
// 点击编辑按钮的操作
CataList.clickeditCata = function() {

}
// 点击删除按钮的操作
CataList.clickDelCata = function() {

}
// Uploader类
var Uploader = {};
Uploader.init = function() {
	var that = this;
	// var Picker = Bang.$("#filePicker");
	// Bang.addEvent(Picker,"click",function() {
	// 	that.upload();
	// })
	this.upload();
}
// upload方法
Uploader.upload = function() {
	var uploader = WebUploader.create({
		auto:true,
		swf: '/Uploader.swf',
		server: 'http://webuploader.duapp.com/server/fileuploader.php',
		pick: '#filePicker',
		accept: {
			title:'Images',
			extensions:'gif,jpg,jpeg,bmp,png',
			mimeTypes:'image/*'
		}
	});
	uploader.on('fileQueued',function(file) {
		var $li = $(
            '<div id="' + file.id + '" class="file-item thumbnail">' +
                '<img>' +
                '<div class="info">' + file.name + '</div>' +
            '</div>'
            ),
        $img = $li.find('img');
        var $list = $("#fileList");
        $list.append( $li );
        uploader.makeThumb( file, function( error, src ) {
        	if ( error ) {
           		$img.replaceWith('<span>不能预览</span>');
            	return;
        }
        $img.attr( 'src', src );
   		}, 100, 100 );
	});
	uploader.on( 'uploadProgress', function( file, percentage ) {
		console.log("1");
		var $li = $( '#'+file.id ),
		$percent = $li.find('.progress span');
		    // 避免重复创建
		if ( !$percent.length ) {
		    $percent = $('<p class="progress"><span></span></p>').appendTo( $li ).find('span');
		}

		$percent.css( 'width', percentage * 100 + '%' );
	});
		// 文件上传成功，给item添加成功class, 用样式标记上传成功。
	uploader.on( 'uploadSuccess', function( file ) {
		$( '#'+file.id ).addClass('upload-state-done');
	});
		// 文件上传失败，显示上传出错。
	uploader.on( 'uploadError', function( file ) {
		var $li = $( '#'+file.id ),
		$error = $li.find('div.error');
		    // 避免重复创建
		if ( !$error.length ) {
		    $error = $('<div class="error"></div>').appendTo( $li );
		}
		$error.text('上传失败');
	});
		// 完成上传完了，成功或者失败，先删除进度条。
	uploader.on( 'uploadComplete', function( file ) {
		$( '#'+file.id ).find('.progress').remove();
	});
}





// 自定义的方法类
var Bang = {};
Bang.isArray = function (arr) {
	if (!arr.isArray) {
		return Object.prototype.toString.call(arr) === "[object Array]";
	}else
	// 否则用IE9支持的isArray方法
		return Array.isArray(arr);
}
Bang.trim = function (arr) {
	var re = /^\s+|\s+$/g;
	return arr.replace(re,"");
}
Bang.hasClass = function (element,className) {
	var cls = element.className;
	var realCls = this.trim(cls).replace.split(/\s+/);
	for (var i = 0; i < realCls.length; i++) {
		if (realCls[i] === className) {
			return true;
		};
	};
	return false;
}
Bang.addClass = function (element,newClassName) {
	var arr = this.trim(element.className).split(/\s+/);
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == newClassName) {
			return;
		}
	}
	element.className += " " + newClassName;
	element.className = trim(element.className);
}
Bang.removeClass = function (element,oldClassName) {
	var arr = this.trim(element.className).split(/\s+/);
	var str = "";
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] != oldClassName) {
			str += arr[i] + " ";
		}
	}
	element.className = str;
}
Bang.addEvent = function(element,type,handler) {
	if (window.addEventListener) {
		addEvent = function(element,type,handler) {
			element.addEventListener(type,handler,false);
		}
	}else if (window.attachEvent) {
		addEvent = function(element,type,handler) {
			element.attachEvent("on"+type,handler);
		}
	}
	addEvent(element,type,handler);
}
Bang.removeEvent = function(element,type,handler) {
	if (window.removeEventListener) {
		addEvent = function(element,type,handler) {
			element.removeEventListener(type,handler,false);
		}
	}else if (window.detachEvent) {
		addEvent = function(element,type,handler) {
			element.detachEvent("on"+type,handler);
		}
	}
	removeEvent(element,type,handler);
}
Bang.ajax = function (url,option) {
	var userdata = "";
	// 默认是get方式
	option.type = option.type || "get";
	if (window.XMLHttpRequest) {
		var xhr = new XMLHttpRequest();
	}else {
		var xhr = new ActiveXObect("Microsoft.XMLHTTP")
	}
	// 请求数据的处理
	if (typeof option.data == "object") {
		for (var attr in option.data) {
			userdata += attr + "=" + option.data[attr] + "&";
		}
		userdata += userdata.substring(0,userdata.length-1);
	} else {
		userdata += option.data || "";
	}
	// 以get港式发送数据
	if (option.type.toLowerCase() == "get") {
		xhr.open("get",url+"?"+userdata,true);
		xhr.send(null);
	}else{
		xhr.setRequestHeader("content-type","application/x-www-form-urlencoded;charset=UTF-8")
		xhr.open("post",url,true);
		xhr.send(userdata);
	}
	// 请求的响应
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				option.onsuccess && option.onsuccess(xhr.responseText);
			} else {
				option.onerror && option.onerror(xhr.status);
			}
		};
	}
}
Bang.$ = function (selector) {
   var that = this;
	//清除首尾空格
	selector = this.trim(selector);
	var arr = [];
	//判断selector中间是否有空格需要拆分
	var space = selector.indexOf(' ');

	//有空格的情况 拆分查询
	if (space != -1) {
		//以空格形式分割字符串 从得到的数组最后进行逆向查询
		arr = selector.split(/\s+/);
		for (var i = arr.length; i>1; i--) {
			return query(arr[i-1],arr[i-2]);
		}
	//无空格情况 直接查询
	} else {
		return query(selector);
	}
	//主要查询器
	function query(selector,oParent) {
		//selector 中间有空格被拆分了
		if (arr[0]) {
			oParent = $(arr[0]);
		} else {
			oParent = document;
		}

		//判断首字符
		switch (selector.charAt(0)) {
			case '#' :
				return document.getElementById(selector.substring(1));
				break;
			case '.' :
				return getClass(oParent,selector.substring(1));
				break;
			case '[' :
				//返回第一个属性匹配元素
				return getQueryAttr(selector);
				break;

			//默认形式：
			//1、纯标签形式，例如 p
			//2、带属性形式，例如 p[data]
			//3、带.class形式，例如 p.info
			default :

				//  第三种情况
				if (selector.indexOf('.') != -1) {
	
					var defArr = selector.split('.');
					return getClass(oParent, defArr[1], defArr[0]);
				} 
				//	第二种情况
				else if (selector.indexOf('[') != -1) {
					
					var defArr = selector.split('[');
					defArr[1] = "["+defArr[1];
					return getQueryAttr(defArr[1], defArr[0]);

				}
				// 第一种情况
				else {
					return oParent.getElementsByTagName(selector)[0];
				}
			
				break;
			}
	}
	//匹配[]选择器
	function getQueryAttr(attr,tagName) {
		tagName = tagName || '*';
		var aElem = document.getElementsByTagName(tagName);
		//去掉首尾[]
		attr = attr.substring(1,attr.length-1);
		//判断是否有=
		if (attr.indexOf('=') != -1) {
			var arr = attr.split('=');
			for (var i = 0; i<aElem.length; i++) {
				if (aElem[i].getAttribute(arr[0]) == arr[1]) {
					return aElem[i];
				}
			}
		} else {
			for (var i = 0; i<aElem.length; i++) {
				if (aElem[i].getAttribute(attr) || aElem[i].getAttribute(attr) == "") {
					return aElem[i];
				}
			}
		}
		return '';
	}

	//获取class元素，兼容ie低版本,返回第一个符合条件
	//三个参数，1、父级 2、class名 3、标签名
	function getClass(oParent,oClass,tagName) {
        tagName = tagName || "*";
        var aElem = oParent.getElementsByTagName(tagName);
        var arr = [];
        for (var i = 0; i<aElem.length; i++) {            
            if (aElem[i].className) {
                
                //对每个元素的class名进行处理
                var classNames = that.trim(aElem[i].className);
                          
                var arr2 = classNames.split(/\s+/);
            
                for (var j = 0; j<arr2.length; j++) {
                    //返回第一个符合条件的元素
                    if (arr2[j] === oClass) {
                        return aElem[i];
                    }
                }
            }  
        }
        return '';
    }
}