package com.example.btl.model;

import java.sql.Date;
import org.hibernate.annotations.Formula;
import jakarta.persistence.*;

@Table(name="comment")
@Entity
public class Comment {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int userId;
	private int bookId;
	private String cmt;
	private int star;
	private Date date;
	@Formula("(select u.name from User u where u.id=user_id)")
	private String name;
	public int getId() {
		return id;
	}
	public int getUserId() {
		return userId;
	}
	public int getBookId() {
		return bookId;
	}
	public String getName() {
		return name;
	}
	public String getCmt() {
		return cmt;
	}
	public int getStar() {
		return star;
	}
	public Date getDate() {
		return date;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setUserId(int userId) {
		this.userId=userId;
	}
	public void setDate(Date date) {
		this.date=date;
	}
}
