package com.example.btl.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.btl.model.CustomUserDetails;
import com.example.btl.model.History;
import com.example.btl.model.User;
import com.example.btl.repository.HistoryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin
@RestController
public class HistoryController {
	@Autowired
	HistoryRepository historyRepository;
	
	@GetMapping("/user/history")
	public List<History> getAllBookOrder(Authentication auth) {
		User user=((CustomUserDetails)auth.getPrincipal()).getUser();
		return historyRepository.findAllByUserId(user.getId());
	}
	@PutMapping("/user/history/new")
	public void addBookOrder(@RequestBody Map<String, Object> hisJson,Authentication auth){
		ObjectMapper mapper = new ObjectMapper();
		History his= mapper.convertValue(hisJson,History.class);
		if(his.getAmount()<=0) return;
		User user=((CustomUserDetails)auth.getPrincipal()).getUser();
		his.setUserId(user.getId());
		his.setDate(Date.valueOf(LocalDate.now()));
		historyRepository.save(his);
	}
	@DeleteMapping("/user/history/delete/{id}")
	public void deleteBookOrder(@PathVariable int id) {
		historyRepository.deleteById(id);
	}
}
