package com.fhcs.hrnorte.backend.infrastructure.in.rest.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fhcs.hrnorte.backend.application.port.in.service.AuthServicePort;
import com.fhcs.hrnorte.backend.core.domain.bo.TokenBO;
import com.fhcs.hrnorte.backend.infrastructure.in.rest.dto.request.LoginRequest;
import com.fhcs.hrnorte.backend.infrastructure.in.rest.dto.request.RefreshTokenRequest;
import com.fhcs.hrnorte.backend.infrastructure.in.rest.dto.request.RegisterRequest;
import com.fhcs.hrnorte.backend.infrastructure.in.rest.dto.response.AuthResponse;
import com.fhcs.hrnorte.backend.infrastructure.in.rest.mapper.AuthDTOMapper;


@RestController
@RequestMapping("/api/auth")
public class AuthControllerAdapter {

    private final AuthServicePort authServicePort;

    public AuthControllerAdapter(AuthServicePort authServicePort) {
        this.authServicePort = authServicePort;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        TokenBO tokenBO = authServicePort.register(
                request.getUsername(),
                request.getEmail(),
                request.getPassword()
        );
        AuthResponse response = AuthDTOMapper.toAuthResponse(tokenBO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        TokenBO tokenBO = authServicePort.login(request.getEmail(), request.getPassword());
        AuthResponse response = AuthDTOMapper.toAuthResponse(tokenBO);
        return ResponseEntity.ok(response);
    }


    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@Valid @RequestBody RefreshTokenRequest request) {
        TokenBO tokenBO = authServicePort.refresh(request.getRefreshToken());
        AuthResponse response = AuthDTOMapper.toAuthResponse(tokenBO);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@Valid @RequestBody RefreshTokenRequest request) {
        authServicePort.logout(request.getRefreshToken());
        return ResponseEntity.noContent().build();
    }
}