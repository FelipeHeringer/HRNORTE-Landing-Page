package com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.repository;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.fhcs.hrnorte.backend.application.port.out.persistence.RefreshTokenRepositoryPort;
import com.fhcs.hrnorte.backend.core.domain.bo.RefreshTokenBO;
import com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.entity.RefreshTokenEntity;
import com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.jpa.RefreshTokenJpaRepository;
import com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.mapper.RefreshTokenMapper;

import java.time.Instant;
import java.util.Optional;

@Repository
public class RefreshTokenRepositoryAdapter implements RefreshTokenRepositoryPort {

    private final RefreshTokenJpaRepository refreshTokenJpaRepository;

    public RefreshTokenRepositoryAdapter(RefreshTokenJpaRepository refreshTokenJpaRepository) {
        this.refreshTokenJpaRepository = refreshTokenJpaRepository;
    }

    @Override
    public RefreshTokenBO save(RefreshTokenBO refreshTokenBO) {
        RefreshTokenEntity entity = RefreshTokenMapper.toEntity(refreshTokenBO);
        RefreshTokenEntity saved = refreshTokenJpaRepository.save(entity);
        return RefreshTokenMapper.toBO(saved);
    }

    @Override
    public Optional<RefreshTokenBO> findByToken(String token) {
        return refreshTokenJpaRepository.findByToken(token)
                .map(RefreshTokenMapper::toBO);
    }

    @Override
    @Transactional
    public void revokeByToken(String token) {
        refreshTokenJpaRepository.revokeByToken(token, Instant.now());
    }

    @Override
    public void delete(RefreshTokenBO refreshTokenBO) {
        RefreshTokenEntity entity = RefreshTokenMapper.toEntity(refreshTokenBO);
        refreshTokenJpaRepository.delete(entity);
    }
}