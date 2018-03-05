var animation={
	DURATION:100,//总时长
	STEPS:20,//总步数
	interval:0,//每步时间间隔
	CSIZE:100+16,//每移动一格，需要移动的距离

	timer:null,//保存当前定时器的序号，专用于停止定时器
	moved:0,//记录本次动画移动的步数
	tasks:[],//记录本次要移动的所有格子
	
	init:function(){//初始化动画的属性
		//每步时间间隔等于总时间/总步数
		this.interval=this.DURATION/this.STEPS;
	},
	//在动画开始前，向数组中加入要移动的任务
	addTask:function(cell,orgR,orgC,tarR,tarC){
		//每个任务包括要移动的格子对象cell,
		//	纵向移动的步长rStep
		//	横向移动的步长cStep
		//纵向移动的步长，等于目标位置r-当前位置r，再乘以每个格子的高，再除以总步数
		var rStep=(tarR-orgR)*this.CSIZE/this.STEPS;
		//横向移动的步长,等于目标位置c-当前位置c，再乘以每个格子的宽，再除以总步数
		var cStep=(tarC-orgC)*this.CSIZE/this.STEPS;
		//向任务数组中添加新任务
		this.tasks.push({
			cell:cell,
			rStep:rStep,
			cStep:cStep
		});
	},
	//将任务中，每个对象移动一步的方法
	moveStep:function(callback)//遍历cells中每个格子，移动一步
	{
		console.log(this.tasks.length);
		//依次取出任务列表中每个格子，移动一步
		for(var i=0;i<this.tasks.length;i++){
			var task=this.tasks[i];//得到一个格子的移动任务
			//获得当前要移动的格子的样式
			var style=getComputedStyle(task.cell);
			//获得当前top值
			var top=parseFloat(style.top);
			//获得当前left值
			var left=parseFloat(style.left);
			//设置格子的top为当前top+垂直方向移动步长
			task.cell.style.top=top+task.rStep+"px";
			//设置格子的left为当前left+水平方向移动步长
			task.cell.style.left=left+task.cStep+"px";
		}
		this.moved++;//每移动一次，移动步数+1
		if(this.moved==this.STEPS)
		{//如果移动步数用完，就结束动画
			//依次取出任务中每个格子，清除每个格子的样式，让格子迅速回归原位
			for(var i=0;i<this.tasks.length;i++)
			{
				var task=this.tasks[i];
				task.cell.style.left="";
				task.cell.style.top="";
			}
			clearInterval(this.timer);//停止定时器
			this.timer=null;
			this.moved=0;//重置移动点数为
			this.tasks=[];//清空任务数组，以免干扰下次移动
			callback();//执行移动后需要调用的回调方法
		}
	},
	start:function(callback){
		this.init();//初始化，计算时间间隔
		//开始动画，反复调用move方法。
		//因为move是回调函数，回调时this都指window，所以必须提前绑定动画对象，来替换move中的this。
		this.timer=setInterval(this.moveStep.bind(this,callback),this.interval);
	}
	
}