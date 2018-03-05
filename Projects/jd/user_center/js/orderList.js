//获取订单列表功能
$(function(){
	/*
	// 利用String类型定义固定的HTML代码
	var table="";
	//1.实现AJAX的异步请求
	$.getJSON("server.php",function(data){
		for(var i=0;i<data.length;i++)
		{
			//data[i]--Object
			var dateTime=data[i].payTime.split(/\s/);//split(" ");
			table += 
			'<tr class="trOrder">'
			    +'<td colspan="6">'
			      +'<span>订单编号: '+data[i].orderId+'</span>'
			      +'<span><a href="'+data[i].shopAddr+'" target="_blank">'+data[i].shopName+'</a></span>'
			    +'</td>'
			+'</tr>'
			+'<tr class="trProd">'
			    +'<td>'
			      +'<div class="imgList">'
			      +'<a href="#" target="_blank">'
					+'<img src="'+data[i].imgLink+'" width="50" height="50" title="【限量秒杀】男士时尚韩版腰带加宽针扣潮商务皮带azkz A款针扣咖啡色"/>'
			      +'</a>'
			      +'</div>'
			    +'</td>'
			    +'<td>'+data[i].userName+'</td>'
			    +'<td>¥'+data[i].payMoney+'<br/>'+data[i].payMode+'</td>'
			    +'<td>'+dateTime[0]+'<br/>'+dateTime[1]+'</td>'
			    +'<td>'+data[i].payState+'</td>'
			    +'<td>'
			      +'<a href="#">查看</a>|<a href="#">删除</a><br/>'
			      +'<a href="#">评价晒单</a><br/>'
			      +'<a class="btn_buy_again" href="#">还要买</a>'
			    +'</td>'
			+'</tr>';
		}
		$("#orderList").append($(table));
	});
	*/
	var table = '<tr class="trOrder"><td colspan="6"><span>订单编号: {0}</span><span><a href="{2}" target="_blank">{1}</a></span></td></tr><tr class="trProd"><td><div class="imgList"><a href="#" target="_blank"><img src="{3}" width="50" height="50" title="【限量秒杀】男士时尚韩版腰带加宽针扣潮商务皮带azkz A款针扣咖啡色"/></a></div></td><td>{4}</td><td>￥{5}<br/>{6}</td><td>{7}<br/>{8}</td><td>{9}</td><td><a href="#">查看</a>|<a href="#">删除</a><br/><a href="#">评价晒单</a><br/><a class="btn_buy_again" href="#">还要买</a></td></tr>';
	var html="";
	$.getJSON("./server.json",function(data)
	{
		for(var i=0;i<data.length;i++)
		{
			// 日期时间分解为日期和时间
			var datetime = data[i].payTime.split(" ");
			var datas = [
				data[i].orderId,
				data[i].shopName,
				data[i].shopAddr,
				data[i].imgLink,
				data[i].userName,
				data[i].payMoney,
				data[i].payMode,
				datetime[0],
				datetime[1],
				data[i].payState
			];
			html += replaceString(table,datas);
		}
		$("#orderList").append($(html));
	});
});
// 将字符串中所有的编号，修改为编号对应的数据内容
function replaceString(string,datas)
{
	var str =string;
	for(var i=0;i<datas.length;i++)
	{
		var reg=new RegExp("\\{"+i+"\\}","g");
		str=str.replace(reg,datas[i]);
	}
	return str;
}