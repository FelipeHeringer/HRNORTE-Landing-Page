package com.fhcs.hrnorte.backend.application.port.out.persistence;

import java.util.Optional;

import com.fhcs.hrnorte.backend.core.domain.bo.RefreshTokenBO;

public interface RefreshTokenRepositoryPort {
    RefreshTokenBO save(RefreshTokenBO refreshTokenBO);
    Optional<RefreshTokenBO> findByToken(String token);
    void revokeByToken(String token);
    void delete(RefreshTokenBO refreshTokenBO);
}