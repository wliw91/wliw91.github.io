/* 秒杀倒计时 */
var hh = document.querySelector('.seckill-hh');
var mm = document.querySelector('.seckill-mm');
var ss = document.querySelector('.seckill-ss');
//计算倒计时的时间
var inputTime =+new Date('2021-12-24 18:00:00');//倒计时的结束时间，自己设置时间
var nowTime=+new Date();   //当前时间
var times=(inputTime-nowTime)/1000; //剩余时间的总的毫秒数
var second = parseInt(times%60);
var minute = parseInt(times/60%60);
var hour = parseInt(times/60/60%24);
//保持两位显示——id=操作的标签，num=对应的时间数字
function inner(id,num){
	if(num < 10){
		id.innerHTML = '0'+num;
	}else{
		id.innerHTML = num;
	}
}
//先回显一次，防止第一次刷新页面有空白
timer();
setInterval(timer,1000);
function timer(){
  inner(hh,hour);
	inner(mm,minute);
	//1.第三位数字的显示
  inner(ss,second);
	second--;
	//2、第三位归零后判断第二位数字的值来确定是否将值变为60继续下一轮
	if(second == 0){
		if(minute != 0){
			minute--;
			second=59;
		}
		//3、判断第二位和第一位的值
		if(minute == 0){
			if(hour != 0){
				minute=59;
				hour--;
			}
		}
		//4、若三个值都为0，清除定时器
		if(hour==0 && minute==0 && second==0){
			clearInterval(timer);
		}
		//5、调用函数回显
		inner(hh,hour);
		inner(mm,minute);
		inner(ss,second);
	}
}

var clock = document.querySelector('.seckill-clock');
var clock_hour = parseInt(new Date()/60/60%24);
//console.log(clock_hour);