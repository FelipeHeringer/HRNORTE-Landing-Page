package com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.entity.RefreshTokenEntity;

import java.time.Instant;
import java.util.Optional;

public interface RefreshTokenJpaRepository extends JpaRepository<RefreshTokenEntity, Integer> {

    Optional<RefreshTokenEntity> findByToken(String token);

    @Modifying
    @Query("UPDATE RefreshTokenEntity rt SET rt.revoked = true, rt.revokedAt = :revokedAt WHERE rt.token = :token")
    void revokeByToken(@Param("token") String token, @Param("revokedAt") Instant revokedAt);
}