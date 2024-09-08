create database db_book_management;
use db_book_management;


CREATE TABLE `tbl_user` (
  `id` bigint(20) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `country_code` varchar(8) default '+91',
  `mobile` bigint unique,
  `email` varchar(128) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `role` enum('user','admin') DEFAULT NULL,
  `token` varchar(128) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1 COMMENT '1=active,0=deactive',
  `is_delete` tinyint(1) DEFAULT 0 COMMENT '1=delete 0=not_delete',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

create table tbl_book(
	id bigint primary key auto_increment,
    name  varchar(128) DEFAULT NULL,
    title text ,
    author  varchar(128) DEFAULT NULL,
    thumbnail  varchar(128) DEFAULT NULL,
    pdf  varchar(128) DEFAULT NULL,
    pages int,
    tags  varchar(128) DEFAULT NULL,
    is_active tinyint(1) DEFAULT 1 COMMENT '1=active,0=deactive',
    is_delete tinyint(1) DEFAULT 0 COMMENT '1=delete 0=not_delete',
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
    );
    
    create table tbl_cart(
	id bigint primary key auto_increment,
    user_id bigint,
    book_id bigint,
    is_active tinyint(1) DEFAULT 1 COMMENT '1=active,0=deactive',
    is_delete tinyint(1) DEFAULT 0 COMMENT '1=delete 0=not_delete',
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    foreign key (user_id) references tbl_user(id),
    foreign key (book_id) references tbl_book(id)
    );
    
    create table tbl_cart(
	id bigint primary key auto_increment,
    user_id bigint,
    book_id bigint,
    is_active tinyint(1) DEFAULT 1 COMMENT '1=active,0=deactive',
    is_delete tinyint(1) DEFAULT 0 COMMENT '1=delete 0=not_delete',
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    foreign key (user_id) references tbl_user(id),
    foreign key (book_id) references tbl_book(id)
    );
    drop table tbl_order_detalis;
    
    create table tbl_order(
	id bigint primary key auto_increment,
    user_id bigint,
    total_qty int,
    sub_total float(8,1),
    total_amount float(8,1),
    status enum('Pending','Accept','Reject') default 'Pending',
    is_active tinyint(1) DEFAULT 1 COMMENT '1=active,0=deactive',
    is_delete tinyint(1) DEFAULT 0 COMMENT '1=delete 0=not_delete',
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
    
    );
    
	create table tbl_order_details(
	id bigint primary key auto_increment,
    user_id bigint,
    order_id bigint,
    book_id bigint,
    qty int,
    per_book_price float(8,1),
    total_amount float(8,1),
    is_active tinyint(1) DEFAULT 1 COMMENT '1=active,0=deactive',
    is_delete tinyint(1) DEFAULT 0 COMMENT '1=delete 0=not_delete',
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
    
    );
    
    create table tbl_subscription(
    id bigint primary key auto_increment,
    subscription_id bigint,
    customer_id bigint,
    price_id bigint,
    is_active tinyint(1) DEFAULT 1 COMMENT '1=active,0=deactive',
    is_delete tinyint(1) DEFAULT 0 COMMENT '1=delete 0=not_delete',
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
-- 	foreign key (customer_id) references tbl_user(stripe_id),
--     foreign key (price_id) references tbl_book(price_id)
    );
    
	create table tbl_subscription_detail(
    id bigint primary key auto_increment,
    name varchar(128),
    description text,
    price float(8,2),
    is_active tinyint(1) DEFAULT 1 COMMENT '1=active,0=deactive',
    is_delete tinyint(1) DEFAULT 0 COMMENT '1=delete 0=not_delete',
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
    );
    
    create table tbl_module(
	id bigint primary key auto_increment,
	name varchar(64),
    is_active tinyint(1) DEFAULT 1 COMMENT '1=active,0=deactive',
    is_delete tinyint(1) DEFAULT 0 COMMENT '1=delete 0=not_delete',
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
    );
    
    create table tbl_permission(
	id bigint primary key auto_increment,
    user_id bigint,
    module_id bigint,
    added boolean,
    edit boolean,
    deleted boolean,
    view boolean,
    is_active tinyint(1) DEFAULT 1 COMMENT '1=active,0=deactive',
    is_delete tinyint(1) DEFAULT 0 COMMENT '1=delete 0=not_delete',
    created_at timestamp NOT NULL DEFAULT current_timestamp(),
    updated_at timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    foreign key (user_id) references tbl_user(id),
    foreign key (module_id) references tbl_book(id)
    );
