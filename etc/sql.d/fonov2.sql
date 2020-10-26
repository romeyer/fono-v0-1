drop database `fonov2`;
create database `fonov2` character set utf8 collate utf8_general_ci;
use `fonov2`;

drop table `users`;
create table `users` (
    `uuid` char(32) not null primary key,
    `mail` varchar(128) not null unique,
    `mail_lastchange` char(12) null,
    `mail_checked` tinyint(1) default 0,
    `pass` char(128) not null,
    `pass_lastchange` char(12) null,
    `created_at` char(12) null,
    `status` int(2) not null default 0,
    `access` int(2) not null default 0
) engine=InnoDB;
INSERT INTO `fonov2`.`users`(`uuid`,`mail`, `pass`,`status`,`access`) 
VALUES ("0000000000000000000000000001", "r_sb@live.com", "jhgvg", 1, 99);
