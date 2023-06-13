package com.example.btl.controller;

import java.util.Date;
import org.springframework.stereotype.Component;

import com.example.btl.model.CustomUserDetails;

import io.jsonwebtoken.*;

@Component
public class JwtTokenProvider {
    private final String JWT_SECRET = "abcde";
    private final long JWT_EXPIRATION = 604800000L;
    public String generateToken(CustomUserDetails userDetails) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);
        return Jwts.builder()
                   .setSubject(""+userDetails.getUser().getId())
                   .setIssuedAt(now)
                   .setExpiration(expiryDate)
                   .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                   .compact();
    }
    public int getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser()
                            .setSigningKey(JWT_SECRET)
                            .parseClaimsJws(token)
                            .getBody();
        return Integer.parseInt(claims.getSubject());
    }
}