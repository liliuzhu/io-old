//封装$函数，专门负责按选择器查找元素
//比如：
//$("选择器")——>在整个页面查找和选择器匹配的元素集合
//elem.$("选择器")->在elem下查找和选择器匹配的元素集合
window.$=HTMLElement.prototype.$=function(selector)
{//如果在全局调用$，就用document.querySelectorAll
	//否则直接用this.querySelectorAll
	var result=(this==window?document:this).querySelectorAll(selector);
	//如果仅返回一个元素，则直接取出唯一的元素返回，不再返回集合
	result.length==1&&(result=result[0]);
	return result;
}

/**********************顶部菜单**********************************/
function show()//弹出一级菜单
{
	this.$("."+this.className+">a").className="hover";
	this.$('[id$="_items"]').style.display="block";
}
function hide()//隐藏一级菜单
{
	this.$("."+this.className+">a").className="";
	this.$('[id$="_items"]').style.display="none";
}
/*********************全部商品分类菜单*****************************/
function toggleL1()//显示或隐藏一级菜单
{
	var display=getComputedStyle($("#cate_box")).display;
	$("#cate_box").style.display=(display=="none")?"block":"none";
}
function toggleL2()
{
	var display=getComputedStyle(this.$(".sub_cate_box")).display;
	this.$(".sub_cate_box").style.display=(display=="none")?"block":"none";
	this.$("h3").className=(this.$(".sub_cate_box").style.display=="none")?"":"hover";
}
/*************商品详情的页签****************************/
function showTab(e){//this->.main_tabs
	e=e||window.event;//获取事件对象e
	var target=e.target||e.srcElement;//获取目标元素target: ul li a
	//如果target不是ul
	if(target.nodeName!="UL")
	{
		//如果target是a
		target.nodeName=="A"&&(target=target.parentNode);
		//	设置target为target的父元素
		//如果target的class不是current
		if(target.className!="current")
		{
			//在当前ul下查找class为current的li，保存在curr中,清除class
			this.$(".current").className="";
			target.className='current';
			//找到id为product_detail下的class为show的元素，
			$("#product_detail>.show").className="";
			//target的i不是-1
			if(target.getAttribute("i")!=-1)
			{
				//找到id为product_detail下的所有id以product_开头的直接子元素，保存在divs中
				var divs=$("#product_detail>[id^='product_']");
				//获取divs中和target的i属性相同位置的div，设置class为show
				divs[target.getAttribute("i")].className="show";
			}
		}
	}
}
//尽量不要用变量临时存储DOM元素对象
window.addEventListener('load',function(){
	/**********************顶部菜单**********************************/
	//找到class为app_id的li
	$(".app_jd").addEventListener("mouseover",show);
	//为li绑定鼠标进入事件为show
	//为li绑定鼠标移出事件为hide
	$(".app_jd").addEventListener("mouseout",hide);
	$(".service").addEventListener("mouseover",show);
	$(".service").addEventListener("mouseout",hide);
	/*********************全部商品分类*****************************/
	$("div#category").addEventListener("mouseover",toggleL1);
	$("div#category").addEventListener("mouseout",toggleL1);
	var lis=$("#cate_box>li")
	for(var i=0;i<lis.length;i++)
	{
		lis[i].addEventListener("mouseover",toggleL2);
		lis[i].addEventListener("mouseout",toggleL2);
	}
	/*************商品详情的页签****************************/
	//找到id为product_detail下的class为main_tabs的ul,绑定单击事件为showTab
	$("#product_detail>ul.main_tabs").addEventListener("click",showTab);
	//
	preview.init()
});


var preview={
	LICOUNT:0,//保存li的总数
	moved:0,//保存已经左移的li个数，左移一次+1，右移一次-1
	LIWIDTH:0,//每个li的宽度
	STARTLEFT:0,//ul开始时的left值
	ul:null,//整个iconlist元素
	aLeft:null,//左边的按钮（其实是向右移动）
	aRight:null,//右边的按钮(其实是向左移动)


	MSIZE:0,//mask的高和宽
	SMSIZE:0,
	mask:null,
	smask:null,
	MAX:0,
	init:function()
	{
		///////////////////////icon_list的移动和图片的切换///////////////////////
		this.ul=$("#icon_list");
		this.STARTLEFT=parseFloat(getComputedStyle(this.ul).left);
		this.LICOUNT=this.ul.$("li").length;
		this.LIWIDTH=parseFloat(getComputedStyle(this.ul.$("li")[0]).width);
		//console.log(this.LIWIDTH);
		this.aLeft=$("[class^='backward']");
		this.aRight=$("[class^='forward']");
		this.aRight.addEventListener('click',move.bind(this));
		this.aLeft.addEventListener('click',move.bind(this));
	///////////////为ul绑定onmouseover事件为changeMImg//////////////////
		this.ul.addEventListener('mouseover',changeMImg)
		//////////////////////////mask随鼠标移动
		this.mask=$("#mask");
		this.MSIZE=parseFloat(getComputedStyle(this.mask).width);
		this.smark=$("#superMask");
		this.SMSIZE=parseFloat(getComputedStyle(this.smark).width);
		this.smark.addEventListener('mouseover',maskToggle);
		this.smark.addEventListener('mouseout',maskToggle);
		this.MAX=this.SMSIZE-this.MSIZE;
		this.smark.addEventListener('mousemove',maskMove.bind(this));
	}
}
/********************控制mask随鼠标移动**************************/
function maskMove(e)
{
	e=e||window.event;
	var target=e.target||e.srcElement;
	var x=e.offsetX;
	var y=e.offsetY;
	var top=y-this.MSIZE/2;
	var left=x-this.MSIZE/2;
	top=top>this.MAX?this.MAX:top<0?0:top;
	left=left>this.MAX?this.MAX:left<0?0:left;
	this.mask.style.top=top+"px";
	this.mask.style.left=left+"px";
	//修改largeDiv的背景位置为-2top和-2left
  $('#largeDiv').style.backgroundPosition=-16/7*left+"px "+-16/7*top+"px";
}
//控制mask的显示
function maskToggle()
{
	//找到id为mask的div
	//如果div的display为"block"，就改为none，否则改为"block"
	$("#mask").style.display=$("#mask").style.display=="block"?"none":"block";
	$("#largeDiv").style.display=$('#mask').style.display;
	var src=$('#mImg').src;
	var i=src.lastIndexOf(".");
	src=src.slice(0,i-1)+"l"+src.slice(i);
	$('#largeDiv').style.backgroundImage="url("+src+")";
}
/**********小图片的左移和右移********************/
function move(e)
{
	e=e||window.event;
	var target=e.target||e.srcElement;
	if(target.className.search('_disabled')==-1)
	{
		this.moved+=(target.className.search('forward')!=-1)?1:-1;
		//console.log(this.moved);
		this.ul.style.left=-this.LIWIDTH*this.moved+this.STARTLEFT+"px";
		if(this.LICOUNT-this.moved==5)
		{
			this.aRight.className="forward_disabled";
		}
		else if(this.moved==0)
		{
			this.aLeft.className="backward_disabled";
		}
		else 
		{
			this.aLeft.className="backward";
			this.aRight.className="forward";
		}
	}
}
/***********进入小图片，切换上方的中图片*******************/
function changeMImg(e)
{
	e=e||window.event;
	var target=e.target||e.srcElement;
	if(target.nodeName=="IMG")
	{
		var src=target.src;
		//console.log(src);
		var i=src.lastIndexOf(".");
		//console.log(i)
		src=src.slice(0,i)+"-m"+src.slice(i);
		document.body.querySelector("#mImg").src=src;
	}
}