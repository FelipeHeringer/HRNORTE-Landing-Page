package com.fhcs.hrnorte.backend.application.port.out.security;

import com.fhcs.hrnorte.backend.core.domain.bo.UserBO;

public interface JwtPort {
    String generateAccessToken(UserBO userBO);
    String extractUsername(String token);
    long getAccessTokenExpiration(String accessToken);
    boolean validateToken(String token, String username);
}
