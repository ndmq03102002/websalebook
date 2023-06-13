package com.example.btl.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.btl.model.CustomUserDetails;
import com.example.btl.model.User;
import com.example.btl.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public CustomUserDetails loadUserByUsername(String account) {
        User user = userRepository.findByAccount(account);
        if (user == null) {
            throw new UsernameNotFoundException(account);
        }
        return new CustomUserDetails(user);
    }
    public CustomUserDetails loadUserById(int id) {
    	 User user = userRepository.findById(id).get();
         if (user == null) throw new UsernameNotFoundException("");
         return new CustomUserDetails(user);
    }
}