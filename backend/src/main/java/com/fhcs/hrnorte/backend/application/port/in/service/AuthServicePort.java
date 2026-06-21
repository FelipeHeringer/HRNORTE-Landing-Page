package com.fhcs.hrnorte.backend.application.port.in.service;

import com.fhcs.hrnorte.backend.core.domain.bo.TokenBO;

public interface AuthServicePort {
    TokenBO register(String username, String email, String rawPassword);
    TokenBO login(String email, String rawPassword);
    TokenBO refresh(String refreshToken);
    void logout(String refreshToken);
}
