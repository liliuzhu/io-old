// 消费记录的功能
$(function(){
	// 存储消费记录
	var data = [1200,2000,3000,500,200,800,1800,2200,2600,1000,600,300];
	// 1. 获取canvas元素,创建画布对象
	var canvas=document.getElementById("recordCvs");
	var context=canvas.getContext('2d');
	// 2. 得到canvas元素的宽度和高度
	const WIDTH=canvas.width-15;
	const HEIGHT=canvas.height;
	// 3. 定义"内边距"
	var padding={
		left:60,top:20,
		right:20,
		bottom:50
	}
	// 定义当前坐标轴所需的所有点坐标
	// 4. 绘制基本的坐标轴
	paintLine(context,[
		{x:padding.left,y:padding.top},
		{x:padding.left,y:HEIGHT-padding.bottom},
		{x:WIDTH-padding.right,y:HEIGHT-padding.bottom}
	]);
	// 绘制起点的箭头
	paintLine(context,[
		{x:padding.left-10, y:padding.top+10},
		{x:padding.left, y:padding.top},
		{x:padding.left+10, y:padding.top+10}
	]);
	// 绘制终点的箭头
	paintLine(context,[
		{x:WIDTH-padding.right-10, y:HEIGHT-padding.bottom-10},
		{x:WIDTH-padding.right, y:HEIGHT-padding.bottom},
		{x:WIDTH-padding.right-10, y:HEIGHT-padding.bottom+10}
	]);
	// 5. 绘制x轴的刻度
	var xLength=WIDTH-padding.left-padding.right;//x轴的距离
	console.log(xLength);
	for(var i=1;i<=12;i++)
	{
		if(i < 12){
			paintLine(context,[
				{x:padding.left+xLength/12*i, y:HEIGHT-padding.bottom},
				{x:padding.left+xLength/12*i, y:HEIGHT-padding.bottom+15}
			]);
		}
		paintText(context,{
			font : "14px 宋体",
			align : "center",
			baseline : "top",
			content : i+"月",
			x : padding.left+xLength/12*(i-1),
			y : HEIGHT-padding.bottom+20
		});
	}
	//绘制y轴的刻度
	var yLength=HEIGHT-padding.top-padding.bottom;
	// 获取消费记录中的最大值
	var max = Math.max.apply(this,data);
	console.log(max);
	for(var i=1;i<5;i++){
		paintLine(context,[
			{x:padding.left-15, y:padding.top+yLength/5*i},
			{x:padding.left, y:padding.top+yLength/5*i}
		]);
		paintText(context,{
			font : "14px 宋体",
			align : "right",
			baseline : "middle",
			content : max-(max/4)*(i-1),
			x : padding.left-17,
			y : padding.top+yLength/5*i
		});
	}
	//6.绘制折线图
	var length=(HEIGHT-padding.bottom)-(padding.top+yLength/5);
	console.log(length);
	//绘制折线图
	context.beginPath();
	for(var i=0;i<data.length;i++)
	{
		if(i==0)
		{
			context.moveTo(padding.left+xLength/12*i,(HEIGHT-padding.bottom)-length/max*data[i]);
		}else{
			context.lineTo(padding.left+xLength/12*i,(HEIGHT-padding.bottom)-length/max*data[i]);
		}
	}
	context.stroke();
	//绘制圆点
	for(var i=0;i<data.length;i++)
	{
		context.beginPath();
		context.arc(padding.left+xLength/12*i,(HEIGHT-padding.bottom)-length/max*data[i],5,0,Math.PI*2);
		context.fillStyle="red";
		context.fill();
	}
	// 绘制数据内容
	for(var i=0;i<data.length;i++){
		context.font = "14px 宋体";
		context.fillStyle="#000";
		if(i == 0){
			context.textAlign = "left";
			context.textBaseline = "middle";
			context.fillText(data[i],padding.left+xLength/12*i+10,(HEIGHT-padding.bottom)-length/max*data[i]);
		}else{
			context.textAlign = "center";
			context.textBaseline = "bottom";
			context.fillText(data[i],padding.left+xLength/12*i,(HEIGHT-padding.bottom)-length/max*data[i]-5);
		}
	}
	/*
	context.beginPath();
	for(var i=0;i<data.length;i++)
	{
		if(i==0)
		{
			context.moveTo(padding.left+xLength/12*i,())
		}
	}
	//绘制圆点
	for(var i=0;i<data.length;i++)
	{
		context.beginPath();
		context.arc(padding.left+xLength/12*i,(HEIGHT-padding.bottom)-length/max*data[i],5,0,Math.PI*2);
		context.fill();
	}
	for(var i=0;i<data.length;i++)
	{
		context.font="16px 宋体";
		if(i==0)
		{
			context.textAlign="left";
			context.textBaseline="middle";
			context.fillText(data[i],padding.left+xLength/12*i+10,(HEIGHT-padding.bottom.bottom)-length/max*data[i])

		}else{
			context.textAlign="center";
			context.textBaseline="bottom";
			context.fillText(data[i],padding.left+xLength/12*i+10,(HEIGHT-padding.bottom.bottom)-length/max*data[i]-5)
		}
	}*/
});
/*
   定义绘制折线的函数
   * points参数 - 表示所有点的坐标值
     [
		{ x : valueX, y : valueY },
		{ x : valueX, y : valueY },
		{ x : valueX, y : valueY }
	 ]
 */
function paintLine(context,points)
{
	context.beginPath();
	for(var i=0;i<points.length;i++)
	{
		if(i==0)
		{//起点
			context.moveTo(points[i].x,points[i].y);
		}else{//折点和终点
			context.lineTo(points[i].x,points[i].y)
		}
	}
	context.stroke();
}
/*
   定义绘制文字的函数
   * text - 表示绘制的文字
    {
		font : 设置字体样式,
		align : 设置水平对齐,
		baseline : 设置垂直对齐,
		content : 绘制文字内容,
		x : 绘制文字的x轴,
		y : 绘制文字的y轴
    }
 */
 function paintText(context,text)
 {
	context.font=text.font;
	context.textAlign=text.align;
	context.textBaseline=text.baseline;
	context.fillText(text.content,text.x,text.y);
 }