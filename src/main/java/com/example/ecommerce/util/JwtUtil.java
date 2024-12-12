package com.example.ecommerce.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String generateToken(String email) {

        int expTime = 86400000; // token expiry 1 day
        return Jwts.builder()
                .setSubject(email) // the subject of the token
                .setIssuedAt(new Date()) // token creation time
                .setExpiration(new Date(System.currentTimeMillis() + expTime))
                .signWith(key)
                .compact();
    }

    // validate and extract email from JWT

    public String validateToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key) // use the key to validate the token
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject(); // extract the subject - email
    }


}
