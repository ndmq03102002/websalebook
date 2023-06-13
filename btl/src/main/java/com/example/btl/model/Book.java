package com.example.btl.model;

import java.sql.Date;
import jakarta.persistence.*;

@Table(name="book")
@Entity
public class Book {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String title;
	private String author;
	private String description;
	private Date releaseDate;
	private int totalPage;
	private String category;
	private String imgPath;
	private int sold;
//	@OneToMany(mappedBy = "id")
//	private List<History> history;
	public String toString() {
		return title+" "+author;
	}
	public int getId() {
		return id;
	}
	public String getTitle() {
		return title;
	}
	public String getAuthor() {
		return author;
	}
	public String getDescription() {
		return description;
	}
	public Date getReleaseDate() {
		return releaseDate;
	}
	public int getTotalPage() {
		return totalPage;
	}
	public String getCategory() {
		return category;
	}
	public String getImgPath() {
		return imgPath;
	}
	public int getSold() {
		return sold;
	}
	public void setImgPath(String imgPath) {
		this.imgPath=imgPath;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	
}
