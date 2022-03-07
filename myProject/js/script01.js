/* 头部广告关闭按钮 */
function btnClose() {
	document.getElementById("head-ad").style.display = "none";
	document.getElementById("two-D-code").style.top = "30px";
}

/* 定位 */
/* alert(navigator.geolocation); */
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		document.getElementById("adr1").innerHTML = "抱歉，该浏览器不支持获取地理位置";
	}
};
function showPosition(position) {
	document.getElementById("adr1").innerHTML = "纬度：" + position.coords.latitude
		+ "<br>经度：" + position.coords.longtitude;
};

/* 点击切换秒杀列表 */
var j = 0;
var left = 0;
function prevBtn() {
	j--;
	if (j < 0) {
		j = 6;
		// left = -1040;
	}
	left = -192* j;
	document.querySelector(".page-list-all").style.left = left + "px";
};
function nextBtn() {
	//document.getElementById("slider-list1").style.display= "none";
	//document.getElementById("slider-list2").style.display= "block";
	if (j >= 6) {
		j = -1;
		//left = 0;
	}
	j++;
	left = -192 * j;   //偏移量
	document.querySelector(".page-list-all").style.left = left + "px";
};

/* 每日特价切换导航 */
$()

/* 为你推荐 */
$(function () {
	$(".recommend-con").hide();
	$(".recommend-tit div").click(function () {
		
		var id = $(this).attr('id');//获取所点击元素的id
		id = id.slice(3, 4);//获取所点击元素的id的序号
		//alert(id);
		var showId = ".recommend-con" + id;
		//alert(showId);
		$(".recommend-con").addClass(showId);
		$(showId).show();
		$(showId).siblings().hide();
		/* 让顶部导航栏与标题栏的样式切换对应上 */
		let k = "#tit"+id;
		let l = "#ti0"+id;
		//console.log(l);
		$(k).addClass("divChange").siblings().removeClass("divChange");
		$(l).addClass("divChange").siblings().removeClass("divChange");
	})
});
/* $(function () {
	$(".recommend-con").hide();
	$(".recommend-tit div").click(function () {
		$(this).addClass("divChange").siblings().removeClass("divChange");
		var id = $(this).attr('id');//获取所点击元素的id
		id = id.slice(3, 4);//获取所点击元素的id的序号
		//alert(id);
		var showId = ".recommend-con" + id;
		//alert(showId);
		$(".recommend-con").addClass(showId);
		$(showId).show();
		$(showId).siblings().hide();
	})
}); */

/* 
alert(id);
	var showId = $(".recommend-cons").find("div").eq((id-1)).attr('class');
	showId = "."+showId;
	$(showId).show();
	$(showId).siblings().hide();
 */
/* var allTit = document.querySelectorAll(".recommend-tit div");
for (var i = 0; i < allTit.length;i++) {

		allTit[i].num = i;
		alert(i);
 allTit[i].click = function(){
	allTit[i].addClass('divChange');
		if(allTit[i].classList=='divChange'){
			allTit[i].addClass('recommend-tit-con');
		}else{
			allTit[i].addClass('divChange');
		}
	};
} */

/* 顶部导航栏固定*/
$(function () {
	var nav = $(".fixedSearch"); //导航对象
	nav.hide();
	$(".fixedRecommend").hide();
	var win = $(window); //窗口对象  
	var sc = $(document);//document文档对象。
	//获取窗口滚动操作
	win.scroll(function () {
		//滚动条离顶部的高度
		if (sc.scrollTop() >= 646) {
			nav.fadeIn();
			$(".fixedNav").css("position","fixed");
			$(".fixedNav").css("top",80+'px');
		} else {
		$(".fixedNav").css("position","absolute");
		/* 固定侧边栏的位置——与秒杀并排 */
		var offset =$("#seckill").offset();
		let top = offset['top'];
		//console.log(top+"px");
		$(".fixedNav").css("top",top);
		nav.fadeOut();
		}
		/* 为你推荐置顶固定 */
		if (sc.scrollTop() >= 2800) {
			$(".fixedRecommend").fadeIn();
			$(".fixedNav").css("top",'140px');
		} else {
			$(".fixedRecommend").fadeOut();
		}
		/* 侧边固定栏 */
		if (sc.scrollTop() >= 600 && sc.scrollTop() < 900){
			$(".fixedNav .fixN1 a").css("color","red");
		}else{
			$(".fixedNav .fixN1 a").css("color","");
		}
		if(sc.scrollTop() >= 900 && sc.scrollTop() < 1800){
			$(".fixedNav .fixN2 a").css("color","red");
		}else{
			$(".fixedNav .fixN2 a").css("color","");
		} 
		if(sc.scrollTop() >= 1800 && sc.scrollTop() < 2490){
			$(".fixedNav .fixN3 a").css("color","red");
		}else{
			$(".fixedNav .fixN3 a").css("color","");
		}
		if (sc.scrollTop() >= 2490) {
			$(".fixedNav .fixN4 a").css("color","red");
		}else{
			$(".fixedNav .fixN4 a").css("color","");
		}
	})
}) 
/* 右侧导航栏超链接跳转 */
$(function () {
	$(".fixN1").on("click",function(){
		var off = $("#seckill").offset();
		var tp = off['top']-70;
		//console.log(tp);
		//var inx = $(this).index();
		$(window).scrollTop(tp);
	})
	$(".fixN2").on("click",function(){
		var off = $("#daily_price").offset();
		var tp = off['top']-72;
		//console.log(tp);
		//var inx = $(this).index();
		$(window).scrollTop(tp);
	})
	$(".fixN3").on("click",function(){
		var off = $("#channel-square").offset();
		var tp = off['top']-56;
		$(window).scrollTop(tp);
	})
	$(".fixN4").on("click",function(){
			var off = $("#recommend-for-you").offset();
			var tp = off['top']-56;
			//console.log(tp);
			//var inx = $(this).index();
			$(window).scrollTop(tp);
		})

		$(".fixedRecommend").on("click",function(){
			var off = $("#recommend-for-you").offset();
			var tp = off['top']+28.4;
			$(window).scrollTop(tp);
		})
})

/* 机票-酒店-话费 */
$(function(){
		$(".info_service_item a").mouseover(function(){
			$(this).children(".service_ico").children(".service_icon_img_hover").css("visibility","visible");
		});
		$(".info_service_item a").mouseout(function(){
			$(this).children(".service_ico").children(".service_icon_img_hover").css("visibility","hidden");
		})
	})
	/* $(".service_ico").mouseover(function(){
		var new_src = $(this).attr("src");
		console.log(new_src);
		$(".service_icon_img_hover").css("visibility","visible");
	}) */
/* var service_ico = document.querySelectorAll(".service_icon_img");
var ico = 0;
for(let i =0; i < service_ico.length-1 ;i++){
console.log(service_ico[i].src);
} */

