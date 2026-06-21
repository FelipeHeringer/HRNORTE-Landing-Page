package com.fhcs.hrnorte.backend.infrastructure.out.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.fhcs.hrnorte.backend.application.port.out.security.JwtPort;
import com.fhcs.hrnorte.backend.core.domain.bo.UserBO;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class JwtAdapter implements JwtPort {

    @Value("${api.secret.key}")
    private String secretKey;

    @Value("${jwt.access-token-expiration}")
    private long accessTokenExpirationMs;

    // -------------------------------------------------------
    // Implementação do porto
    // -------------------------------------------------------

    @Override
    public String generateAccessToken(UserBO userBO) {
        Map<String, Object> claims = buildClaims(userBO);
        return buildToken(claims, userBO.getUsername(), accessTokenExpirationMs);
    }
    
    @Override
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    @Override
    public long getAccessTokenExpiration(String accessToken) {
        return extractAllClaims(accessToken).getExpiration().getTime();
    }

    @Override
    public boolean validateToken(String token, String username) {
        try {
            String extractedUsername = extractUsername(token);
            return extractedUsername.equals(username) && !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    // -------------------------------------------------------
    // Helpers privados
    // -------------------------------------------------------

    private Map<String, Object> buildClaims(UserBO userBO) {
        Map<String, Object> claims = new HashMap<>();
        List<String> roles = userBO.getRoles().stream()
                .map(role -> role.getRoleName())
                .collect(Collectors.toList());
        claims.put("roles", roles);
        return claims;
    }

    private String buildToken(Map<String, Object> claims, String subject, long expirationMs) {
        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(getSigningKey())
                .compact();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
