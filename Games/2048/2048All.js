var game={
	data:null,//保存RN行CN列的二维数组
	RN:4,//保存总行数
	CN:4,//保存总列数
	score:0,//游戏得分
	top1:0,//保存游戏的历史最高分
	state:1,//保存游戏状态
	Runing:1,//定义运行状态，值为1
	CSIZE:100,//保存每个格的宽和高
	MARGIN:16,//保存每个格之间的间距
	GameOver:0,//定义游戏结束状态，值为0
	PLAYING:2, //定义动画播放中, 值为2
	/*****强调：
		对象自己的方法，要用自己的任何属性，必须+this*/
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
		//now.setFullYear(now.getFullYear()+10);10年
		now.setMonth(now.getMonth()+1);//1个月
		document.cookie="top1="+this.score+";expires="+now.toGMTString();
	},
	getInnerHTML:function()
	{
		//r从0开始到<RN结束，同时声明空数组arr
		for(var r=0,arr=[];r<this.RN;r++)
		{
			//c从0开始到<CN结束，
			for(var c=0;c<this.CN;c++)
			{
				arr.push(""+r+c);
			}
		}
		//console.log(arr);//打桩
		var html='<div id="g'+arr.join('" class="grid"></div><div id="g')+'" class="grid"></div>';
			html+='<div id="c'+arr.join('" class="cell"></div><div id="c')+'" class="cell"></div>';
		return html;
	},
	start:function()//启动游戏
	{
		//找到id为gridPanel的div
		var div=document.getElementById("gridPanel");
		//设置div的内容为this.getInnerHTML()
		div.innerHTML=this.getInnerHTML();

		div.style.width=this.CN*this.CSIZE+this.MARGIN*(this.CN+1)+"px";
		div.style.height=this.RN*this.CSIZE+this.MARGIN*(this.RN+1)+"px";

		
		this.state=this.Runing;//初始化游戏状态
		//1.根据RN和CN，初始化data二维数组
		//设置data为[]
		this.data=[];
		//外层循环控制行r,从0开始到RN结束
		for(var r=0;r<this.RN;r++)
		{
			//向data中压入一个[]
			this.data.push([]);
			//this.data[r]=[];
			//内层循环控制列c，从00开始到CN结束
			for(var c=0;c<this.CN;c++)
			{
				//设置data中r行c列为0
				this.data[r][c]=0;
			}
		}
		console.log(this.data);
		this.score=0;//重置分数；
		this.top1=this.getTop();//从cookie中读取top
		//调用randomNum()方法，生成2个随机数
		this.randomNum();
		this.randomNum();
		//调用updataView()方法，更新页面
		this.updataView();
		var me=this;//留住this
		//为当前网页绑定键盘按下事件
		document.onkeydown=function(e)
		{
			//this->document
			if(me.state==me.Runing)
			{
			//获得按键号：2步：
				var e=window.event||arguments[0];
				switch(e.keyCode)//Uncode编号
				{
					case 37: me.moveLeft();
						break;
					case 38: me.moveTop();
						break;
					case 39: me.moveRight();
						break;
					case 40: me.moveBottom();
						break;
				}
			}
		}/*.bind(this)*/
	},//***每个属性和方法间必须用,分隔******/
	randomNum:function()
	{
		for(;;)//死循环
		{
			//在0~RN-1之间生成一个随机整数r
			var r=parseInt(Math.random()*this.RN);
			//在0~CN-1之间生成一个随机整数c
			var c=parseInt(Math.random()*this.CN);
			//如果data中r行c列的值为0
			if(this.data[r][c]==0)
			{
				//	随机一个数字，如果<0.5，就设置data的r行c列为2，否则设置为4
				this.data[r][c]=(Math.random()<0.5)?2:4;
				break;//  退出循环
			}
		}
	},
	updataView:function()//将data中的数据更新到页面
	{
		//遍历data中的每个元素
		for(var r=0;r<this.RN;r++)
		{
			for(var c=0;c<this.CN;c++)
			{
				//找到页面上id为'c'+r+c的div
				var div=document.getElementById("c"+r+c)
				//如果data中r行c列的元素不等于02
				
				if(this.data[r][c]!=0)
				{
					//设置div的内容为data中r行c列的值
					div.textContent=this.data[r][c];
					//设置div的className属性为"cell n"+this.data[r][c];
					div.className="cell n"+this.data[r][c];
				}
				//否则
				else
				{
					//设置div的内容为""
					div.textContent="";
					//设置div的className为"cell"
					div.className="cell";
				}
			}
		}
		//将游戏的分数显示在界面上
		//找到ID为sceoe的span,直接设置其内容为游戏对象的score
		document.getElementById("score").innerHTML=this.score;
		//将游戏 的最高分显示到页面
		document.getElementById("top").innerHTML=this.top1;
		
		
		for(var r=0;r<this.RN;r++)
		{
			for(var c=0;c<this.CN;c++)
			{
				if(this.data[r][c]>1048576)
					{window.alert("大神结束吧！已经超出最大承受值了！")}
			}
		}


		//根据修改状态，修改页面
		//找到id为gameover的div
		var div=document.getElementById("gameOver");
		if(this.state==this.Runing)
		{
			div.style.display="none";
		}
		else
		{
			div.style.display="block";
		}

		console.log(this.data.join("\n"));
	},
	isGameOver:function()
	{
		for(var r=0;r<this.RN;r++)
		{
			for(var c=0;c<this.CN;c++)
			{
				if(this.data[r][c]==0)
				{return false;}
				if(r<this.data.length-1&&this.data[r][c]==this.data[r+1][c])
				{return false;}
				if(c<this.data[r].length-1&&this.data[r][c]==this.data[r][c+1])
				{return false;}
			}
		}
		return true;
	},
	move:function(iterator){//重构所有移动方法的相同部分
		//将date转为字符串保存在变量before中
		var before=this.data.join("");//before=this.data.toString();
		//console.log(before);
		iterator.call(this);
		//将data转为字符串保存在变量after
		var after=this.data.join("");
		//如果after不等于before
		if(before!=after)
		{
			this.state=this.PLAYING;//开始动画前，改为播放
			//调用动画引擎，启动动画，同时提前传入要在动画结束时调用的回调函数
			animation.start(function(){
				//动画结束后，改为运行
				this.state=this.Runing;
				//调用randomNum()方法，生成2个随机数
				this.randomNum();
				
				//判断游戏是否结束
				if(this.isGameOver())
				{
					this.state=this.GameOver;
					//如果score>top1,才将成绩存入cookie中
					this.score>this.top1&&this.setTop();

					document.getElementById("final").innerHTML=this.score;
				}
				//调用updataView()方法，更新页面
				//console.log(this.Runing);
				this.updataView();
			}.bind(this));
		}
	},
	/****************左移键*************************/
	moveLeft:function()//左移所有行
	{
		this.move(function(){
			//遍历data中每一行
			for(var r=0;r<this.RN;r++){
				//调用moveRightInRow,传入r作为参数，移动当前行
				this.moveLeftInRow(r);
			}//(遍历结束)
		});
	},
	moveLeftInRow:function(r)//左移第r行
	{
		//从0开始遍历data中r中的每个格，到CN-1结束
		for(var c=0;c<this.CN-1;c++)
		{
			var nextc=this.getNextInRow(r,c);//找c下一个不为0的数
			//如果nextc等于-1，就退出循环
			if(nextc==-1)
			{
				break;
			}
			//否则，如果当前元素为0
			else if(this.data[r][c]==0)
			{
				//就将当前元素设置为nextc位置的元素
				this.data[r][c]=this.data[r][nextc];
				animation.addTask(
					document.getElementById("c"+r+nextc),
					r,nextc, r,c
				);
				this.data[r][nextc]=0;//将nextc位置元素设为0
				c--;
			}
			//否则，如果当前位置的元素等于nextc位置元素
			else if(this.data[r][c]==this.data[r][nextc])
			{
				
				this.score+=this.data[r][c]*=2;//就将当前元素*=2；
				animation.addTask(
					document.getElementById("c"+r+nextc),
					r,nextc, r,c
				);
				this.data[r][nextc]=0;//将nextc位置元素设为0
			}
		}
	},
	getNextInRow:function(r,c)//查找c之后下一个不为0的位置
	{
		for(var nextc=c+1;nextc<this.CN;nextc++)//nextc从c+1开始遍历r行中剩余元素
		{
			//如果nextc位置的元素不等于0，就返回nextc
			if(this.data[r][nextc]!=0)
			{
				return nextc;
			}
		}
		return -1;//遍历结束，返回-1；
	},

	/**************右移键**************************/
	moveRight:function()//右移所有行
	{
		
		this.move(function(){
			//遍历data中的每一行
			for(var r=0;r<this.RN;r++)
			{
			//	调用moveRightInRow，传入行号r作为参数
				this.moveRightInRow(r);
			}
		})//结束遍历
	},
	moveRightInRow:function(r)//右移第r行
	{
		//从this.CN-1开始遍历data中r中的每个格，到1结束
		for(var c=this.CN-1;c>0;c--)
		{
			var prevc=this.getPrevInRow(r,c);//找c前一个不为0的数
			//如果prevc等于-1，就退出循环
			if(prevc==-1)
			{
				break;
			}
			//否则，如果当前元素为0
			else if(this.data[r][c]==0)
			{
				//就将当前元素设置为prevc位置的元素
				this.data[r][c]=this.data[r][prevc];
				animation.addTask(
					document.getElementById("c"+r+prevc),
					r,prevc, r,c
				);
				this.data[r][prevc]=0;//将prevc位置元素设为0
				c++;
			}
			//否则，如果当前位置的元素等于prevc位置元素
			else if(this.data[r][c]==this.data[r][prevc])
			{
				this.score+=this.data[r][c]*=2;//就将当前元素*=2；
				animation.addTask(
					document.getElementById("c"+r+prevc),
					r,prevc, r,c
				);
				this.data[r][prevc]=0;//将prevc位置元素设为0
			}
		}
	},
	getPrevInRow:function(r,c)//查找c之前一个不为0的位置
	{
		for(var prevc=c-1;prevc>=0;prevc--)//prevc从c-1开始向前遍历r行中剩余元素
		{
			//如果prevc位置的元素不等于0，就返回prevc
			if(this.data[r][prevc]!=0)
			{
				return prevc;
			}
		}
		return -1;//遍历结束，返回-1；
	},
	/**************上移键**************************/
	moveTop:function()//上移所有
	{
		this.move(function(){
			//遍历data中的每一列
			for(var c=0;c<this.CN;c++)
			{
			//	调用moveLeftInRow，传入列号c作为参数
				this.moveTopInCol(c);
			}//结束遍历
		});
	},
	moveTopInCol:function(c)//上移第c列
	{
		//从0开始遍历data中c列的每个格，到RN-1结束
		for(var r=0;r<this.RN-1;r++)
		{
			var downr=this.getDownInCol(r,c);//找c列中下一个不为0的数
			//如果downr等于-1，就退出循环
			if(downr==-1)
			{
				break;
			}
			//否则，如果当前元素为0
			else if(this.data[r][c]==0)
			{
				//就将当前元素设置为downr位置的元素
				this.data[r][c]=this.data[downr][c];
				//找到rc位置的div,加入要移动的任务
				animation.addTask(
					document.getElementById("c"+downr+c),
					downr,c, r,c
				)
				this.data[downr][c]=0;//将downr位置元素设为0
				r--;
			}
			//否则，如果当前位置的元素等于downr位置元素
			else if(this.data[r][c]==this.data[downr][c])
			{
				
				this.score+=this.data[r][c]*=2;//就将当前元素*=2；
				animation.addTask(
					document.getElementById("c"+downr+c),
					downr,c, r,c
				)
				this.data[downr][c]=0;//将downr位置元素设为0
			}
		}
	},
	getDownInCol:function(r,c)//查找c列第r个之后下一个不为0的位置
	{
		for(var downr=r+1;downr<this.RN;downr++)//downr从c+1开始遍历r行中剩余元素
		{
			//如果downr位置的元素不等于0，就返回downr
			if(this.data[downr][c]!=0)
			{
				return downr;
			}
		}
		return -1;//遍历结束，返回-1；
	},
	/**************下移键**************************/
	moveBottom:function()//下移所有
	{
		this.move(function(){
			//遍历data中的每一列
			for(var c=0;c<this.CN;c++)
			{
			//	调用moveBottomInRow，传入行号c作为参数
				this.moveBottomInCol(c);
			}//结束遍历
		});
	},
	moveBottomInCol:function(c)//下移第c列
	{
		//从0开始遍历data中c列的每个格，到RN-1结束
		for(var r=this.RN-1;r>0;r--)
		{
			var upr=this.getUpInCol(r,c);//找r上一个不为0的数
			//如果upr等于-1，就退出循环
			if(upr==-1)
			{
				break;
			}
			//否则，如果当前元素为0
			else if(this.data[r][c]==0)
			{
				//就将当前元素设置为upr位置的元素
				this.data[r][c]=this.data[upr][c];
				animation.addTask(
					document.getElementById("c"+upr+c),
					upr,c, r,c
				)
				this.data[upr][c]=0;//将upr位置元素设为0
				r++;
			}
			//否则，如果当前位置的元素等于upr位置元素
			else if(this.data[r][c]==this.data[upr][c])
			{
				
				this.score+=this.data[r][c]*=2;//就将当前元素*=2；
				animation.addTask(
					document.getElementById("c"+upr+c),
					upr,c, r,c
				)
				this.data[upr][c]=0;//将upr位置元素设为0
			}
		}
	},
	getUpInCol:function(r,c)//查找c列第r之上的不为0的位置
	{
		for(var upr=r-1;upr>=0;upr--)//upr从r-1开始向上遍历r行中剩余元素
		{
			//如果nextc位置的元素不等于0，就返回nextc
			if(this.data[upr][c]!=0)
			{
				return upr;
			}
		}
		return -1;//遍历结束，返回-1；
	}
}
var direction={
	startx:null,
	starty:null,
	movex:null,
	movey:null,
	dire:null,
	binds:function()
	{
		window.addEventListener("touchstart",this.starts.bind(this));
		window.addEventListener("touchmove",this.moves.bind(this));
		window.addEventListener("touchend",this.ends.bind(this));
		document.body.querySelector("#gameOver .btn").addEventListener("touchend",function(){game.start()});
	},
	starts:function(event)
	{
		event.preventDefault();
		var point = event.touches?event.touches[0]:event;
		this.startx=point.screenX;
		this.starty=point.screenY;
		//document.getElementById("start").innerHTML="开始位置是X:"+this.startx+" , Y:"+this.starty;	
	},
	moves:function(event)
	{
		event.preventDefault();
		var point = event.touches?event.touches[0]:event;
		this.movex=point.screenX;
		this.movey=point.screenY;
		//document.getElementById("end").innerHTML="现在位置是X:"+this.movex+" , Y:"+this.movey;
	},
	ends:function()
	{
		if(game.state==game.Runing)
		{
			if(!this.movex){this.dire=".."}
			else if(this.movex-this.startx>50){this.dire="右划"}
			else if(this.startx-this.movex>50){this.dire="左划"}
			else if(this.starty-this.movey>50){this.dire="上划"}
			else if(this.movey-this.starty>50){this.dire="下划"}
			//document.getElementById("dire").innerHTML=this.dire;
			switch(this.dire)
			{
				case "左划": game.moveLeft();break;
				case "上划": game.moveTop();break;
				case "右划": game.moveRight();break;
				case "下划": game.moveBottom();break;
				default:break;
			}
		}
		this.dire=null;
		this.movex=null;
		this.movey=null;
		this.startx=null;
		this.starty=null;
	}	
}
//页面加载后自动启动游戏
window.onload=function()
{
	direction.binds();
	game.start();
}