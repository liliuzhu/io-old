function $(id){return document.getElementById(id);}
var tetris={//游戏主程序对象
	CSIZE:26,//保存每个格子的宽高
	RN:20,//总行数
	CN:10,//总列数
	OFFSET:15,//保存单元区域距游戏界面边界的内边界
	shape:null,//保存当前正在下落的主角图形
	nextShape:null,//保存下一个备胎图形
	INTERVAL:0,//保存每次下落的速度（时间间隔）
	timer:null,
	wall:null,//保存所有停止下落的方块的二维数据
	top1:0,//保存游戏的历史最高分
	score:0,//保存游戏分数
	lines:0,//保存消除的总行数
	level:1,//保存当前游戏难度
	SCORES:[0,10,50,80,200],//保存消除的行数余分数;
	state:1,//保存游戏的状态
	RUNING:1,//运行状态
	PAUSE:2,//暂停状态
	GAMEOVER:0,//游戏结束
	upDate:1,
	stop:4,
	getTop:function()//获得cookie中的最高分
	{
		var cookies=document.cookie.split("; ");
		for(var i=0;i<cookies.length;i++)
		{
			var kv=cookies[i].split("=");
			cookies[kv[0]]=kv[1];
		}
		return cookies["top1"]||0;
	},
	setTop:function()//将当前游戏的分数保存到cookie
	{
		var now=new Date();
		now.setFullYear(now.getFullYear()+10);
		document.cookie="top1="+this.score+";expires="+now.toGMTString();
	},
	start:function()//启动游戏
	{
		this.state=this.RUNING;
		this.score=0;
		this.top1=this.getTop();
		this.lines=0;
		this.level=1;
		this.upDate=1;
		this.shape=this.randomShape();//创建一个T型的图形对象
		this.nextShape=this.randomShape();//创建一个T型的图形对象
		//this.paintShape();//绘制主角图形
		//初始化方块墙
		this.wall=[];
		for(var i=0;i<this.RN;i++)
		{
			this.wall.push(new Array(this.CN));
		}
		var me=this;
		document.onkeydown=function(e)
		{
			e=e||window.event;
			switch(e.keyCode)
			{
				case 37:(me.state==me.RUNING||me.state==me.stop)&&me.moveLeft();break;//方向左键左移
				case 39:(me.state==me.RUNING||me.state==me.stop)&&me.moveRight();break;//方向右键右移
				case 40:(me.state==me.RUNING||me.state==me.stop)&&me.moveDown();break;//方向下键下移
				case 38:(me.state==me.RUNING||me.state==me.stop)&&me.rotateR();break;//方向手上键右旋
				case 90:(me.state==me.RUNING||me.state==me.stop)&&me.rotateL();break;//z键左旋
				case 83:me.state==me.GAMEOVER&&me.start();break;//s键结束后开始
				case 80:me.state==me.RUNING&&me.pause();break;//p暂停
				case 67:me.state==me.PAUSE&&me.myContinue();break;//c键继续
				case 81:me.gameOver();me.paint();break;//q键gameOver
				case 32:(me.state==me.RUNING||me.state==me.stop)&&me.hard();break;//空格键停止下移
			}
		}
		this.INTERVAL=1000;
		this.timer=setInterval(this.moveDown.bind(this),this.INTERVAL);//启动游戏时间动画
		console.log(this.INTERVAL);
		this.paint();
	},
	hard:function()
	{
		this.state=this.state==this.RUNING?this.stop:this.RUNING;
		this.timer=this.timer!=null?clearInterval(this.timer):setInterval(this.moveDown.bind(this),this.INTERVAL);
	},
	gameOver:function()
	{
		this.state=this.GAMEOVER;
		clearInterval(this.timer);
		this.timer=null;
	},
	myContinue:function()
	{
		this.state=this.RUNING;	
	},
	pause:function()//暂停游戏
	{
		this.state=this.PAUSE;
		this.paint();
	},
	rotateR:function()//让主角图形顺时针旋转
	{
		this.shape.rotateR();
		if(!this.canRotate())
		{this.rotateL();}
		this.paint();
	},
	canRotate:function()
	{
		for (var i=0;i<this.shape.cells.length;i++)
		{
			var cell=this.shape.cells[i];
			if((cell.r<0||cell.r>=this.RN)||(cell.c<0||cell.c>=this.CN)){return false;}
			else if(cell.r<this.RN&&this.wall[cell.r][cell.c]){return false;}
		}	
		return true;
	},
	rotateL:function()//让主角图形逆时针旋转
	{
		this.shape.rotateL();
		if(!this.canRotate())
		{this.rotateR();}
		this.paint();
	},
	moveRight:function()
	{
		if(this.canRight())
		{
			this.shape.moveRight();
		}
		this.paint();
	},
	canRight:function()
	{
		for(var i=0;i<this.shape.cells.length;i++)
		{
			var cell=this.shape.cells[i];
			if(cell.c==this.CN-1||this.wall[cell.r][cell.c+1]){return false;}
		}
		return true;
	},
	canLeft:function()
	{
		for(var i=0;i<this.shape.cells.length;i++)
		{
			var cell=this.shape.cells[i];
			if(cell.c==0||this.wall[cell.r][cell.c-1]){return false;}
		}
		return true;
	},
	moveLeft:function()
	{
		if(this.canLeft())
		{
			this.shape.moveLeft();
		}
		this.paint();
	},
	deleteRows:function()//删除所有满格行
	{
		//自底向上遍历wall中的每一行，同时是声明ls=0;
		for(var r=this.RN-1,ls=0;r>=0;r--)
		{
			//用isFullRow检测当前行，如果当前行是满格行
			//console.log(this.isFullRow(r));
			if(this.isFullRow(r))
			{
				//用delete方法删除当前行
				this.deleteRow(r);
				//将ls+1
				ls++;
				//r留在原地
				r++;
				//如果ls等于4，就退出循环
				if(ls==4){break;}
			}
		}
		//遍历结束返回ls
		return ls;
	},
	isFullRow:function(r)//检查当前行是否是满格行
	{
		//如果将wall中的行，换为字符串后，其中能够中找到开头的，或，，或结尾的，
		return String(this.wall[r]).search(/^,|,,|,$/)!=-1?false:true;
	},
	deleteRow:function(delr)//删除指定行
	{
		//从r行向上遍历wall中的剩余行
		for(var r=delr;r>0;r--)
		{
			this.wall[r]=this.wall[r-1];
			for(var c=0;c<this.wall[r].length;c++)
			{
				//console.log(this.wall[r][c]);
				if(this.wall[r][c])
				{
					//this.wall[r+1]=this.wall[r];错误
					this.wall[r][c].r++;
				}
			}
			this.wall[r-1]=new Array(this.CN);
			if(this.wall[r-2].join("")==""){break;}
		}
	},
	randomShape:function()//在7种图形中，随机生成一个新图形
	{
		//在0~6之间生成随机整数r
		var r=(Math.random()*7)>>>0;
		switch(r)
		{
			//如果r是0，就返回一个新的O图形对象
			case 0:return new O();break;
			//如果r是1，就返回一个新的I图形对象
			case 1:return new I();break;
			//如果r是2，就返回一个新的T图形对象
			case 2:return new T();break;
			case 3:return new S();break;
			case 4:return new Z();break;
			case 5:return new L();break;
			case 6:return new J();break;
		}
	},
	landIntoWall:function()//将停止的方块保存到wall中相同位置
	{
		for(var i=0;i<this.shape.cells.length;i++)//遍历主角图形中每个cell
		{
			//将当前格，保存在变量cell中
			var cell=this.shape.cells[i];
			//将cell保存在wall中和cell相同r，c位置
			this.wall[cell.r][cell.c]=cell;
		}
	},
	moveDown:function()//将主角图形下落一步，重绘一切
	{
		if(this.state==this.RUNING||this.state==this.stop)
		{
			if(this.canDown())
			{
				this.shape.moveDown();//将主角图形下落一步
			}
			else//否则
			{
				//先将shape中的格，搬到wall中
				this.landIntoWall();
				//判断是否有满格的
				var ls=this.deleteRows()
				this.score+=this.SCORES[ls];
				this.lines+=ls;
				if(!this.isGameOver())
				{
					//将nextShape的图形给shape
					this.shape=this.nextShape;
					//为nextShape生成新图形
					this.nextShape=this.randomShape();
					//如果score>top1,才将成绩存入cookie中
					this.score>this.top1&&this.setTop();
				}
				else
				{
					this.gameOver();
				}
			}
			this.paint();//重绘一切
		}
	},
	upDateInter:function()
	{
		console.log(this.score);
		if(this.state!=this.stop&&this.score>=20)
		{
			this.level=3;
			this.INTERVAL=50;
		}else if(this.state!=this.stop&&this.score>=10)
		{
			this.level=2;
			this.INTERVAL=300;
		}
		if(this.level!=this.upDate)
		{
			clearInterval(this.timer);
			this.timer=setInterval(this.moveDown.bind(this),this.INTERVAL);
			this.upDate=this.level;
			console.log(this.upDate);
			var img=new Image();
			img.src="img/升级.png";
			img.style.zIndex=20;
			img.style.top=100+"px";
			$("pg").appendChild(img);
			this.hard()
		}
	},
	paintState:function()
	{
		if(this.state!=this.RUNING&&this.state!=this.stop)
		{
			var img=new Image();
			img.src=this.state==this.PAUSE?"img/pause.png":"img/game-over.png";
			$("pg").appendChild(img);
		}
	},
	isGameOver:function()//检查游戏是否结束
	{
		//遍历备胎图形中每cell对象
		for(var i=0;i<this.nextShape.cells.length;i++)
		{
			var cell=this.nextShape.cells[i];
			if(this.wall[cell.r][cell.c])
			{return true;}
		}
		return false;
	},
	canDown:function()
	{
		//遍历主角图形中的每个cell
		for(var i=0;i<this.shape.cells.length;i++)
		{
			var cell=this.shape.cells[i]
			//当前cell的r==RN-1；
			if(cell.r==this.RN-1||this.wall[cell.r+1][cell.c]){
				//返回false
				return false;
			}
		}
		//(遍历结束)返回true
		return true;
	},
	paintNext:function()
	{
		//创建文档片段
		var frag=document.createDocumentFragment();
		//遍历nextShape中的每个cell
		for(var i=0;i<this.nextShape.cells.length;i++)
		{
			//将当前cell保存在变量中
			var cell=this.nextShape.cells[i];
			//创建一个Image对象img
			var img=document.createElement("img");//new Image();
			//设置img的src为cell的src
			img.src=cell.src;
			//设置img的top为（r+1）*SICE+OFFSET
			img.style.top=(cell.r+1)*this.CSIZE+this.OFFSET+"px";
			//设置img的left为（c+10）*SICE+OFFSET
			img.style.left=(cell.c+10)*this.CSIZE+this.OFFSET+"px";
			//将img追加到frag
			frag.appendChild(img);
		}
		//(遍历结束)将Frag追加到ID为pg的元素下
		$("pg").appendChild(frag);
	},
	paintWall:function()//绘制墙中的所有格
	{
		var frag=document.createDocumentFragment();
		//r从RN-1开始，向上遍历wall中的每个cell
		for(var r=this.RN-1;r>=0;r--)
		{
			for(var c=this.CN-1;c>=0;c--)
			{
				//将当前格临时保存在变量cell中
				var cell=this.wall[r][c];
				//如果cell有效
				if(cell)
				{
					//创建一个Image对象img
					var img=document.createElement("img");//new Image();
					//设置img的src为cell的src
					img.src=cell.src;
					//设置img的top为r*SICE+OFFSET
					img.style.top=cell.r*this.CSIZE+this.OFFSET+"px";
					//设置img的left为c*SICE+OFFSET
					img.style.left=cell.c*this.CSIZE+this.OFFSET+"px";
					//将img追加到frag
					frag.appendChild(img);
				}
			}
		}
		//(遍历结束)将Frag追加到ID为pg的元素下
		$("pg").appendChild(frag);
	},
	paint:function()//重绘一切
	{
		var reg=/<img(.*?)>/ig;
		$("pg").innerHTML=$("pg").innerHTML.replace(reg,"");
		this.paintShape();//重绘做主角图形
		this.paintNext();//重绘备胎
		this.paintWall();//重绘图片墙
		this.paintScore();//重绘分数
		this.paintState();
		this.upDateInter();
	},
	paintScore:function()
	{
		//设置id为score的元素的内容为score属性
		$("score").innerHTML=this.score;
		//设置id为lines的元素的内容为lines属性
		$("lines").innerHTML=this.lines;
		//设置id为level的元素的内容为level属性
		$("level").innerHTML=this.level;
		$("top1").innerHTML=this.top1;
	},
	paintShape:function()//创建主角图形
	{
		//先创建文档片段frag
		var frag=document.createDocumentFragment();
		//遍历主角图形的cells数组的每个cell对象
		for(var i=0;i<this.shape.cells.length;i++)
		{
			//将当前各自对象，临时保存变量cell中
			var cell=this.shape.cells[i];
			//创建Image元素，保存在变量img中
			var img=new Image();//document.createElement("img");
			//设置img的src，为cell的src
			img.src=cell.src;
			//设置img的top，为r*CSIZE+OFFSET
			img.style.top=cell.r*this.CSIZE+this.OFFSET+"px";
			//设置img的left，为?
			img.style.left=cell.c*this.CSIZE+this.OFFSET+"px";
			frag.appendChild(img);//将img追加到frag中
		}//(遍历结束)将frag追加到id为pg的元素下
		$("pg").appendChild(frag);
	}
}
window.onload=function()
{
	tetris.start();
}