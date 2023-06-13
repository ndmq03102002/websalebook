package com.example.btl.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.btl.model.Book;

public interface BookRepository extends JpaRepository<Book, Integer> {
	@Query(value="SELECT b FROM Book b WHERE b.title LIKE %:str% OR b.author LIKE %:str%")
	public List<Book> findAllByString(@Param("str")String str);
	public Book findByTitleAndAuthor(String title,String author);
}
