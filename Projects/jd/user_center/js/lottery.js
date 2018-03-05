// 实现幸运抽奖功能
$(function(){
	/*******初始化********/
	// 1. 得到对应的画布对象
	var canvas=document.getElementById("lotteryCvs");
	var context=canvas.getContext("2d");
	// 2. 得到画布的宽度和高度
	const WIDTH=canvas.width;
	const HEIGHT=canvas.height;
	// 3. 加载旋转功能的图片
	var as=new Image();
	as.src="img/as.png";
	as.width=499;
	as.height=499;
	var pin=new Image();
	pin.src="img/pin.png";
	pin.width=358;
	pin.height=301;
	/****** 静态绘制 *******/
	// 随机生成一个角度
	var rand=Math.floor(Math.random()*361);
	// 4. 保证上述图片加载完毕
	pin.onload=function(){wite();}
	function wite(){
	//setTimeout(function(){
		// a. 将旋转中心点移动到画布中心点;
		context.translate(WIDTH/2,HEIGHT/2);
		// b. 分别绘制转盘和指针
		context.rotate(Math.PI/180*rand);
		context.drawImage(as,-as.width/2,-as.height/2);
		context.rotate(-Math.PI/180*rand);
		context.drawImage(pin,-pin.width/2+10,-pin.height/2-10);
	//},200);

	}
	/****** 动态效果 *******/
	var num=0;
	var startTime=null;
	//5.获取button按钮，绑定click事件（动态入口）
	var num=0;
	var startTime=null;
	// 5. 获取button按钮,绑定click事件(动态入口)
	$("#btnLottery").click(function(){
		if(num==3)
		{
			alert("今天抽奖次数已用完,明天再来吧.");
			$(this).attr("disabled","disabled");
			return false;
		}
		// a. 获取开始旋转的时间点
		startTime=new Date().getTime();
		console.log(startTime);
		// b. 开始旋转转盘
		rotateImg();
		// c. 禁用开发旋转按钮
		$(this).attr("disabled","disabled");
		num++;
	});
	// 6. 初始化旋转角度
	var du = 1,c = 1,t;
	// 6. 定义动态效果的函数
	function rotateImg(){
		// 转盘向右旋转du度
		context.rotate(Math.PI/180*du);
		context.drawImage(as,-as.width/2,-as.height/2);
		// 指针向左旋转du度
		context.rotate(-Math.PI/180*du);
		context.drawImage(pin,-pin.width/2+10,-pin.height/2-10);
		du=du+c;
		// 获取当前的时间点
		var endTime = new Date().getTime();
		// 判断如果旋转超过10秒,停止
		if(startTime != null && endTime-startTime <= 5000){
			c = c + 0.5;
		}else if(startTime != null && endTime-startTime < 10000){
			c = c - 0.5;
		}
		if(startTime != null && endTime-startTime >= 10000){
			// 停止
			clearTimeout(t);
			// 将按钮变为可用
			$("#btnLottery").removeAttr("disabled");
		}else{
			// 持续旋转
			t = setTimeout(rotateImg,100);
		}
	}

})