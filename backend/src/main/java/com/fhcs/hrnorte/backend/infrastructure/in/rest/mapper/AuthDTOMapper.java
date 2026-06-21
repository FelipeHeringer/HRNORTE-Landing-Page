package com.fhcs.hrnorte.backend.infrastructure.in.rest.mapper;

import com.fhcs.hrnorte.backend.core.domain.bo.TokenBO;
import com.fhcs.hrnorte.backend.infrastructure.in.rest.dto.response.AuthResponse;

public final class AuthDTOMapper {

    private AuthDTOMapper() {}

    public static AuthResponse toAuthResponse(TokenBO tokenBO) {
        return AuthResponse.success(
                tokenBO.getAccessToken(),
                tokenBO.getRefreshToken(),
                tokenBO.getExpiresIn(),
                tokenBO.getUser()
        );
    }
}