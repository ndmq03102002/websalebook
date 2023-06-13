package com.example.btl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.btl.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	public User findByAccount(String account);
	public boolean existsByAccount(String account);
}
