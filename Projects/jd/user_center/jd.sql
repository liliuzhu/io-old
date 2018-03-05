/* 如果jd数据库存在的话,删除 */
DROP DATABASE IF EXISTS jd;
/* 创建jd数据库 */
CREATE DATABASE IF NOT EXISTS jd CHARACTER SET utf8;
/* 创建数据库表 */
use jd;
CREATE TABLE jd_order (
  id INT PRIMARY KEY AUTO_INCREMENT,
  orderId VARCHAR(30),
  shopName VARCHAR(50),
  shopAddr VARCHAR(50),
  imgLink VARCHAR(50),
  userName VARCHAR(50),
  payMoney DECIMAL(16,2),
  payMode VARCHAR(30),
  payTime DATETIME,
  payState VARCHAR(30)
);
/* 初始化数据表的数据内容 */
INSERT INTO jd_order VALUES(NULL,'9545709796','BROWNE FOX旗舰店','http://mall.jd.com/index-119003.html','img/prod1.jpg','张无忌',21.90,'在线支付','2015-5-30T13:40:20','已完成');

INSERT INTO jd_order VALUES(NULL,'9195223439','BROWNE FOX旗舰店','http://mall.jd.com/index-119003.html','img/prod2.jpg','张无忌',24.80,'在线支付','2015-5-10T15:20:20','已发货');

INSERT INTO jd_order VALUES(NULL,'9545656843','BROWNE FOX旗舰店','http://mall.jd.com/index-119003.html','img/prod3.jpg','张无忌',22.90,'货到付款','2015-05-05T9:14:20','已完成');

INSERT INTO jd_order VALUES(NULL,'9130907509','BROWNE FOX旗舰店','http://mall.jd.com/index-119003.html','img/prod4.jpg','张无忌',3567.50,'货到付款','2015-04-23T9:14:20','已发货');
