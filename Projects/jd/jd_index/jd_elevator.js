//$可直接使用
//window.onload=function(){}会覆盖jd_index.js中的
//解决
window.addEventListener("load",function(){
	elevator.init();
});
function getElementTop(elem)
{
	var elemTop=elem.offsetTop;
	elem=elem.offsetParent;
	while(elem!=null)
	{
		elemTop+=elem.offsetTop;
		elem=elem.offsetParent;
	}
	return elemTop;
}
var elevator={
	DURATION:1000,
	STEPS:50,
	INTERVAL:0,
	moved:0,
	timer:null,
	FLOORHEIGHT:0,
	UPLEVEL:0,
	DOWNLEVEL:0,
	init:function(){
		//计算每步时间间隔
		this.INTERVAL=this.DURATION/this.STEPS;
		var style=getComputedStyle($("#f1"));
		this.FLOORHEIGHT=parseFloat(style.height)+parseFloat(style.marginBottom);
		this.UPLEVEL=(innerHeight-this.FLOORHEIGHT)/2;
		this.DOWNLEVEL=this.UPLEVEL+this.FLOORHEIGHT;
		window.addEventListener("scroll",this.scroll.bind(this));
		$("#elevator>ul").addEventListener("mouseover",this.liToggle);
		$("#elevator>ul").addEventListener("mouseout",this.liState);
		$("#elevator>ul").addEventListener('click',this.scrollPage.bind(this));
	},
	scrollPage:function(e){//负责将页面滚动到指定的位置
		clearTimeout(this.timer);
		this.timer=null;
		e=e||window.event;//获得事件对象
		var target=e.srcElement||e.target;//获得target
		if(target.nodeName=="A"){//如果target是a
			//获得当前target对应的序号
			var	i=
				parseInt(target.previousElementSibling.innerHTML);
			var span=$('#f'+i+">header>span");//获得span
			//获得span距页面顶部的距离
			var elemTop=getElementTop(span);
			//让页面滚动到指定的top位置
			//window.scrollTo(0,elemTop-this.UPLEVEL);
		/*动画*/
			//获得目标top
			var targetTop=elemTop-this.UPLEVEL;
			//获得当前top
			var currTop=document.body.scrollTop||
						document.documentElement.scrollTop;
			var step=(targetTop-currTop)/this.STEPS;//计算步长step
			this.scrollStep(step);
		}
	},
	scrollStep:function(step){//滚动一步的动画
		window.scrollBy(0,step);
		this.moved++;
		if(this.moved<this.STEPS){
			this.timer=setTimeout(
				this.scrollStep.bind(this,step),this.INTERVAL);
		}else{
			this.moved=0;
		}
	},
	liToggle:function(e)
	{
		e=e||window.event;
		var target=e.target||e.srcElement;
		target.nodeName==("A")&&(target=target.parentNode);
		if(target.nodeName=="LI")
		{
			target.$("a:first-child").style.display="none";
			target.$(".etitle").style.display="block";
		}
	},
	scroll:function(){
		var spans=$(".floor>header>span");
		for(var i=0;i<spans.length;i++)
		{
			var  elemTop=getElementTop(spans[i]);
			console.log(elemTop);
			var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
			if(scrollTop>elemTop-this.UPLEVEL)
			{
				spans[i].className="";
			}
			else if(scrollTop>elemTop-this.DOWNLEVEL)
			{
				spans[i].className="hover";
			}
			else
			{
				spans[i].className="";
			}
		}
		var hoverSpan=$(".floor>header>span.hover");
		$("#elevator").style.display=hoverSpan!=null?"block":"none";
		this.liState();
	},
	liState:function()
	{
		var spans=$(".floor>header>span");
		var lis=$("#elevator li");
		for(var i=0;i<spans.length;i++)
		{
			if(spans[i].className=="hover")
			{
				lis[i].$("a:first-child").style.display="none";
				lis[i].$(".etitle").style.display="block";
			}
			else
			{
				lis[i].$("a:first-child").style.display="block";
				lis[i].$(".etitle").style.display="none";
			}
		}
	}
}
