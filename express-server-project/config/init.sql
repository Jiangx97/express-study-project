-- 建库脚本
drop database if exists express_study_db;
create database express_study_db character set utf8mb4;
use express_study_db;


-- 建表
CREATE TABLE `admin` (
  `admin_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '管理员id',
  `admin_account` varchar(50) NOT NULL COMMENT '管理员账号',
  `admin_pwd` varchar(50) NOT NULL COMMENT '管理员密码',
  `admin_name` varchar(10) NOT NULL COMMENT '管理员姓名',
  `admin_gender` varchar(4) NOT NULL COMMENT '管理员性别',
  `is_valid` char(1) NOT NULL DEFAULT 'Y' COMMENT '是否生效',
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='管理员信息表'

-- 测试数据
INSERT INTO `admin` VALUES (1,'admin001','U2FsdGVkX19S3gu1sh/dRku7qQE/MwgY6QqlOMY5/FY=','admin001','男','Y'),(2,'admin002','U2FsdGVkX19n96VV9CE+9IXSkDiXLJ14SKpOOdeLGMg=','admin002','男','Y');

CREATE TABLE `customer` (
  `customer_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `customer_account` varchar(50) NOT NULL COMMENT '用户账号',
  `customer_pwd` varchar(50) NOT NULL COMMENT '用户密码',
  `customer_name` varchar(10) NOT NULL COMMENT '用户姓名',
  `customer_gender` varchar(4) NOT NULL COMMENT '用户性别',
  `is_valid` varchar(1) NOT NULL DEFAULT 'Y' COMMENT '是否生效',
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户信息表'

-- 测试数据
INSERT INTO `customer` VALUES (1,'test','U2FsdGVkX19n96VV9CE+9IXSkDiXLJ14SKpOOdeLGMg=','测试用户','男','Y');
