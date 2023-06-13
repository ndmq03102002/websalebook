package com.example.btl.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity

public class WebSecurityConfig {
	@Autowired
	private JwtAuthenticationFilter jwtAuth;
	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
	@Bean
	public PasswordEncoder passwordEncoder()
	{
	    return new BCryptPasswordEncoder();
	}
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.csrf().disable()
			.cors().and()
			.authorizeHttpRequests()
			.requestMatchers("/","/login","/register","/images/**").permitAll()
			.requestMatchers("/user/**").hasAnyAuthority("ROLE_USER","ROLE_ADMIN")
			.requestMatchers("/admin/**").hasAuthority("ROLE_ADMIN")
			.anyRequest().denyAll();
			http.addFilterBefore(jwtAuth, UsernamePasswordAuthenticationFilter.class);
		return http.build(); 
	  }
}