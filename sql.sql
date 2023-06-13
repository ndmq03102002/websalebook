create database test1;
use test1;
create table book(
	id int not null primary key AUTO_INCREMENT,
	title varchar(255) not null,
    author varchar(255) not null,
    description varchar(1000),
    release_date date not null,
    total_page int,
    category varchar(255),
    sold int default 0,
    img_path varchar(255)
);
insert into book
values 
		('1','Naruto','Masashi Kishimoto','Naruto - Sức mạnh vĩ thú','2010-10-10',150,'Manga',340,'naruto.jpg'),
		('2','Đắc nhân tâm','Dale Carnegie','Đắc nhân tâm – How to win friends and Influence People  của Dale Carnegie là quyển sách nổi tiếng nhất, bán chạy nhất và có tầm ảnh hưởng nhất của mọi thời đại. Tác phẩm đã được chuyển ngữ sang hầu hết các thứ tiếng trên thế giới và có mặt ở hàng trăm quốc gia. ','2020-10-10',300,'Tâm lý',290,'dacnhantam.jpg'),
		('3','Nhà giả kim','Paulo Coelho','Một cuốn sách hay dành cho những người đã đánh mất đi ước mơ hoặc chưa bao giờ có nó.','2015-10-10',100,'Văn học',1002,'nhagiakim.jpg'),
		('4','Harry Potter','J. K. Rowling','Nội dung câu chuyện viễn tưởng từng gây sốt trên nhiều thị trường sách này đề cập về cuộc chiến của cậu bé phù thủy Harry Potter 1 mình chống lại một phù thủy hắc ám Chúa tể Voldemort, người đã giết cha mẹ cậu cũng như toàn bộ phù thủy chống lại hắn để thực hiện tham vọng làm chủ thế giới phù thủy và con người.','2020-10-10',599,'Viễn tưởng',700,'harry.jpg'),
        ('5','Ông già và biển cả','Hemingway','Đây là một tác phẩm lý tưởng, nó thật sự mang ý nghĩa rất lớn đặc biệt là đối với những ai đang muốn bỏ cuộc, đang muốn đầu hàng chính bản thân mình, bạn không thể biết được điều gì đang đợi bạn phía trước, hãy tin tưởng vào con đường bạn đã chọn, tin tưởng vào khả năng của chính mình.','2020-10-10',200,'Viễn tưởng',395,'onggia.jpg'),
        ('6','Overlord','Maruyama Kugane','abcd','2012-10-10',400,'Light novel',231,'2.jpe'),
        ('8','Ứng dụng trí tuệ nhân tạo','Bernard Marr & Matt Ward',' Giới thiệu 50 câu chuyện thực tế với những tình huống thực tế, cuốn sách này mô tả cách thức AI được ứng dụng vào thực tế nhằm giải quyết những vấn đề mà các doanh nghiệp trên toàn cầu phải đối mặt.','2017-10-10',100,'Khoa học',123,'ungdungai.jpg'),
		('7','Lược sử thời gian','Stephen Hawking','Lược sử thời gian là cuốn sử thi về sự ra đời, sự hình thành và phát triển của vũ trụ. Tác giả đưa vào tác phẩm của mình toàn bộ tiến bộ tiến trình khám phá của trí tuệ loài người trên nhiều lĩnh vực: Triết học, Vật lý, Thiên văn học…','2015-10-10',400,'Khoa học',550,'luocsuthoigian.png');
;
create table user(
	id INT NOT NULL AUTO_INCREMENT primary key,
    surname varchar(255),
    name varchar(255) not null,
    dob date,
    role varchar(255) default "USER",
    gender int default 0,
    account varchar(255) not null ,
    password varchar(255) not null
);
create table history(
	id int  AUTO_INCREMENT primary key,
    book_id int not null,
    user_id int not null,
    amount int not null,
    date date,
    foreign key(book_id) references book(id) on delete cascade,
    foreign key(user_id) references user(id) on delete cascade
);
create table comment(
	id int  AUTO_INCREMENT primary key,
    book_id int not null,
    user_id int not null,
    cmt varchar(1000),
    star int ,
    date date,
    foreign key(book_id) references book(id) on delete cascade,
    foreign key(user_id) references user(id) on delete cascade
);
