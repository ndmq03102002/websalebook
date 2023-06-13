package com.example.btl.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.example.btl.model.Comment;
import com.example.btl.model.CustomUserDetails;
import com.example.btl.model.User;
import com.example.btl.repository.CommentRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin
@RestController
public class CommentController {
	@Autowired
	private CommentRepository commentRepository;
	
	@GetMapping("/user/comment/book/{id}")
	public List<Comment> getAllBookComments(@PathVariable int id){
		return commentRepository.findAllByBookId(id);
	}
	@PutMapping("/user/comment/book/new")
	public void addComment(@RequestBody Map<String, Object> cmtJson,Authentication auth) {
		ObjectMapper mapper = new ObjectMapper();
		Comment cmt = mapper.convertValue(cmtJson, Comment.class);
		if(cmt.getCmt().equals("") && cmt.getStar()==0) return;
		cmt.setDate(Date.valueOf(LocalDate.now()));
		User user=((CustomUserDetails)auth.getPrincipal()).getUser();
		cmt.setUserId(user.getId());
		Comment tmp= commentRepository.findByUserIdAndBookId(cmt.getUserId(), cmt.getBookId());
		if(tmp!=null) cmt.setId(tmp.getId());
		commentRepository.save(cmt);
	}
}
