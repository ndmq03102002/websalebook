package com.example.btl.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.example.btl.exception.UserExistsException;
import com.example.btl.model.CustomUserDetails;
import com.example.btl.model.Jwt;
import com.example.btl.model.User;
import com.example.btl.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin
@RestController
public class UserController {
	@Autowired
	private UserRepository userRespository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public Jwt authenticateUser(@RequestBody Map<String, Object> loginRequest) {
    	ObjectMapper mapper = new ObjectMapper();
		User user = mapper.convertValue(loginRequest, User.class);
		if(user.getAccount()==null || user.getPassword()==null) return null;
		user.setAccount(user.getAccount().toLowerCase());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getAccount(),
                        user.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        var userDetail=(CustomUserDetails) authentication.getPrincipal();
        String jwt = tokenProvider.generateToken(userDetail);
        return new Jwt(userDetail.getUser().getRole(),jwt);
    }
    @PostMapping("/register")
    public void register(@RequestBody Map<String, Object> userJson ) {
    	ObjectMapper mapper = new ObjectMapper();
		User user = mapper.convertValue(userJson, User.class);
		if(user.getName()==null || user.getAccount()==null || user.getPassword()==null) return;
		user.setAccount(user.getAccount().toLowerCase());
		if(userRespository.existsByAccount(user.getAccount())) throw new UserExistsException();
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole("USER");
		userRespository.save(user);
    }
}