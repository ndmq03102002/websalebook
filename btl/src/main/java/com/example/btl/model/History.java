package com.example.btl.model;

import java.sql.Date;
import jakarta.persistence.*;

@Table(name="history")
@Entity
public class History {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private Date date;
	private int userId;
	private int amount;
	@ManyToOne
	@JoinColumn(name="book_id")
	private Book book;
	
	public int getId() {
		return id;
	}
	public Date getDate() {
		return date;
	}
	public int getUserId() {
		return userId;
	}
	public int getAmount() {
		return amount;
	}
	public void setDate(Date date) {
		this.date=date;
	}
	public Book getBook() {
		return book;
	}
	public void setUserId(int userId) {
		this.userId=userId;
	}
}
