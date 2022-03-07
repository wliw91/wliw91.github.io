/* 中央大图片的轮播点击切换 */
var arr = new Array()
arr[0] = "img/big01.jpg";
arr[1] = "img/big02.jpg";
arr[2] = "img/big03.jpg";
arr[3] = "img/big04.jpg";
arr[4] = "img/big05.jpg";
arr[5] = "img/big06.jpg";
//var arr = ["img/food01.jpg","img/food02.jpg","img/food03.jpg","img/food04.jpg"];
var prev = document.getElementById("bigImg-prev");
var next = document.getElementById("bigImg-next");
var i = 0;
/* 点击左右来切换中央大图片 */
function btnPrev() {
	if (i < 0) {
		i = arr.length - 1;
	}
	i--;
	document.getElementById("image").src = arr[i];
};
function btnNext() {
	if (i >= 5) {
		i = 0;
	}
	i++;
	document.getElementById("image").src = arr[i];
};
// prev.onclick = btnPrev();
// next.onclick = btnNext();
var time = setInterval(btnNext, 2000);
	prev.onmouseover = function(){
		clearInterval(time);
	}
	next.onmouseover = function(){
		clearInterval(time);
	}
	prev.onmouseout = function(){
		time = setInterval(btnNext, 2000);
	}
	next.onmouseout = function(){
		time = setInterval(btnNext, 2000);
	}
/* setInterval(function () {
	img();
}, 2000); */


/* 秒杀列表右侧自动轮播1 */
//所有div标签,li标签
var aImgs = document.querySelectorAll('.brand-slider a');
var aLis = document.querySelectorAll('.brand-slider li');
var index = 0;        //当前图片下标
var lastIndex = 0;
function btnRight(){
	//记录上一张图片的下标
	lastIndex = index;
	//清除上一张图片的样式
	aImgs[lastIndex].className = '';
	aLis[lastIndex].className = '';
	index++;
	index %= aImgs.length;    //实现周期性变化
	//设置当前图片的样式
	aImgs[index].className = 'on';
	aLis[index].className = 'active';
}
let t = setInterval(btnRight,2000);
$(".brand-slider li").mouseover(function(){
	clearInterval(t);
	$(this).addClass("active").siblings().removeClass("active");
	let n = $(this).index();
	let a_id = "#a"+n;
	$(a_id).addClass("on").siblings().removeClass("on");
	//$(aImgs).addClass("on");
	//aImgs[n].addClass("on");
	console.log(n);
})
$(".brand-slider li").mouseout(function(){
	 t = setInterval(btnRight,2000);
})

/* 发现好货的走马灯效果 */
var millisec = 15;     //滚动间隔时间（毫秒）
var intervalId;
var left2 = 0;
// var ul;
// window.onload = function(){
    var ul = document.getElementById("find-list-ul");
    ul.innerHTML += ul.innerHTML;   //复制一份相同的li
    var lis = ul.getElementsByTagName("li");
    //ul.style.width = (lis[0].offsetWidth * lis.length) + "px";  //重新设置宽度
    intervalId = setInterval("scroll()", millisec);
    var swiper = document.querySelector(".find-list");
	//鼠标移动暂停
    swiper.onmouseover = function(){
      clearInterval(intervalId);
    }
    swiper.onmouseout = function(){
      intervalId = setInterval("scroll()", millisec);
    }
// }
function scroll(){
     left2 -= 1;
     //定位小于等于总宽度的二分之一时，则left设置为0
     if(left2 <= -ul.offsetWidth / 2)
        left2 = 0;
    ul.style.left = left2 + "px";
}

/* 新品首发轮播效果 */
var new_num = 0;
var left3 = 0;
var left4 = 0;
var imgs = document.querySelector('.new-good-imgs');
imgs.innerHTML += imgs.innerHTML;  //复制一份
var new_cons = document.querySelector('.new-good-cons');
new_cons.innerHTML += new_cons.innerHTML;
var allNGimg = document.querySelectorAll('.new-good-item img');
newNext();
newPrev();
function newPrev() {
	new_num--;
	if (new_num < 0) {
		new_num = 5;
	}
	left3 = -120 * new_num - 60;
	left4 = -246 * new_num;
	for(var i=0;i<allNGimg.length-1;i++){
		if((new_num+1)==i){
			allNGimg[i].classList.add('img2');
		}else{
			allNGimg[i].classList.remove('img2');
		}
	}
	document.querySelector(".new-good-imgs").style.left = left3 + "px";
	document.querySelector(".new-good-cons").style.left = left4 + "px";
};
function newNext() {
	/* if (new_num >= 8) {
		new_num = -1;
	} */
	new_num++;
	//偏移量
	left3 = -120 * new_num - 60;   
	left4 = -246 * new_num;
	//定位小于等于图片总宽度的二分之一时，则left设置为0
	if(left3 <= -imgs.offsetWidth / 2 ){
		document.querySelector(".new-good-imgs").style.transition = "left 0s";
		left3 = -60;
		new_num = 0;
	}else{
		document.querySelector(".new-good-imgs").style.transition = "left 0.5s";
	}
	//定位<=介绍总宽度的二分之一时，left设为0
	if(left4 <= -new_cons.offsetWidth / 2 ){
		left4 = 0;
		new_num = 0;
	}
	for(var i=0; i<allNGimg.length; i++){
		if((new_num+1) == i){
			allNGimg[i].classList.add('img2');
		}else{
			allNGimg[i].classList.remove('img2');
		}
	}
	document.querySelector(".new-good-imgs").style.left = left3 + "px";
	document.querySelector(".new-good-cons").style.left = left4 + "px";
};
var timeout = setInterval(newNext,2000);
var new_next = document.getElementById("new-next");
var new_prev = document.getElementById("new-prev");
	new_next.onmouseover = function(){
		clearInterval(timeout);
	}
	new_prev.onmouseover = function(){
		clearInterval(timeout);
	}
	new_next.onmouseout = function(){
		timeout = setInterval(newNext, 2000);
	}
	new_prev.onmouseout = function(){
		timeout = setInterval(newNext, 2000);
	}


/* JD图片重复播放 */
var logo = document.getElementById("logo");
function JD(){
	var logo_img = document.getElementById("img1");
	logo_img.src = "img/JD1.gif";
	function con(){
		var logo_con = document.querySelector(".logo_con");
		logo_con.style.display = "block";
	}
	setTimeout(con,2000);
}
//初次刷新页面执行一次
setTimeout(JD,2000);
//恢复初始样式
function first(){
	document.getElementById("img1").src = "img/jd3.png";
	document.querySelector(".logo_con").style.display = "none";
}
setTimeout(first,6000);
//鼠标移动执行
logo.onmouseover = function(){
	JD();
	/* time_out = setInterval(JD,4000); */
	setTimeout(first,6000);
	}
logo.onmouseout= function(){
	var time_out = setInterval(JD,4000);
	clearInterval(time_out);
	/* document.getElementById("img1").src = "img/jd3.png"; */
	}










/* 关闭按钮 */
var closes = document.querySelectorAll('.recommend_hover_delete');
$(".recommend_hover_delete").click(function(){
	let k = $(this).parent().parent();
	//console.log(k);
	k.addClass("dis_none");
	//k.addClass("dis_none").siblings().removeClass("dis_none");
})
$(".recommend-lk").mouseover(function(){
	let q = $(this).children(".recommend_hover");
	q.css("display","block");
	//q.addClass("dis_bl").siblings().removeClass("dis_bl");
})
$(".recommend-lk").mouseout(function(){
	let q = $(this).children(".recommend_hover");
	q.css("display","none");
})
/* for(var x of closes) {
	var item = x.parentNode.parentNode.className;
	x.addEventListener('click',() => {

		item.classList.add = 'dis_none';
	})
} */
/*
var re_hover =  document.querySelectorAll('.recommend-lk a');
re_hover.onmouseover = function(){
	clearInterval(timeout);
}
re_hover.onmouseout = function(){
	timeout = setInterval(newNext, 2000);
} */
/*function closeBtn() {
	var lists = document.querySelectorAll(".recommend-lk");
	for(var j=0;j<closes.length-1;j++){
		closes[j].onclick = function(){
			alert(j);
			 for(var i=0;i<lists.length-1;i++){
				if(i==j){
					list[i].className='dis_none';
				}
			} 		
			}
	}}*/
/* 	for(var j=0;j<closes.length-1;j++){
		var close = closes[j];
	}	
	 if(list==close){
				console.log(i);
				//list[i].style.display = "none";
				//list[i].classList.add = "dis_none";
				list[i].setAttribute("class","dis_none");
				//list[i].className='dis_none';
				console.log(list[i]);
			} */


