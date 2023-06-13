package com.example.btl.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.btl.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
	public List<Comment> findAllByBookId(int bookId);
	public Comment findByUserIdAndBookId(int userId,int bookId);
}
