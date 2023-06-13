package com.example.btl.model;

public class Jwt {
	private String role;
	private String jwt;
	public Jwt(String role, String jwt) {
		super();
		this.role = role;
		this.jwt = jwt;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getJwt() {
		return jwt;
	}
	public void setJwt(String jwt) {
		this.jwt = jwt;
	}
	
}
