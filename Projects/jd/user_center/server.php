<?php
	//1.接收客户端的请求（忽略）；
	//2.向MySQL查询数据内容；
	//2a.建立PHP与MySQL之间的连接
	$conn=mysqli_connect('127.0.0.1','root','','jd','3306');
	/*
		2b.向MySQL查询数据内容
		 *.定义SQL语句
		   *.将生成的SQL语句，放在MySQL数据库中验证是否正确
		 *.向MySQL发送SQL语句
	*/
	$sql='SELECT * FROM jd_order';
	//解决中文乱码问题
	mysqli_query($conn,'SET NAMES utf8');
	//2c.得到MySQL返回的结果集对象
	$result=mysqli_query($conn,$sql);
	//2d.关闭连接
	mysqli_close($conn);
	/*
	   3. 解析结果集对象,转换为JSON结构
	     * 解析结果集对象,得到Object或Array类型
		   mysqli_fetch_array()方法
		   * 只是将一行转换为数组
		     * 索引数组 - 数据内容
			 * 关联数组 - 字段名称+数据内容
		   * 问题
		     * 多行数据,得到多个数组
		   * 处理
		     * 将多个数组进行合并
		 * 将Object或Array转换为JSON结构
		   * PHP中处理JSON内容
		     * json_decode()方法
			   * 将JSON字符串转换为JSON对象
			 * json_encode()
			   * 将JSON对象转换为JSON字符串
		   * PHP中的JSON对象指什么?
		     * Object类型
			 * Array类型
	*/
	$jsonArr=array();//创建空数组
	while($arr=mysqli_fetch_array($result,MYSQLI_ASSOC))
	{
		// 将每一行数据的数组,添加到大数组
		array_push($jsonArr,$arr);
	}
	$json=json_encode($jsonArr);
	// 4. 向客户端响应
	echo $json;
?>