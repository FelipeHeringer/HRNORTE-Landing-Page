package com.fhcs.hrnorte.backend.infrastructure.in.rest.dto.response;

import com.fhcs.hrnorte.backend.core.domain.bo.UserBO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthResponse {

    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private long expiresIn;
    private UserDTO safeUser;
    private boolean success;
    private String message;

    // -------------------------------------------------------
    // Factories estáticas
    // -------------------------------------------------------

    public static AuthResponse success(String accessToken, String refreshToken,
            long expiresIn, UserBO user) {
        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(expiresIn)
                .safeUser(UserDTO.fromUser(user)).build();
    }

    public static AuthResponse error(String message) {
        return AuthResponse.builder()
                .success(false)
                .message(message).build();
    }

}