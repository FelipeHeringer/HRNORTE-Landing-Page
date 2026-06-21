package com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.mapper;

import com.fhcs.hrnorte.backend.core.domain.bo.RefreshTokenBO;
import com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.entity.RefreshTokenEntity;

public final class RefreshTokenMapper {

    private RefreshTokenMapper() {}

    public static RefreshTokenEntity toEntity(RefreshTokenBO bo) {
        if (bo == null) return null;

        RefreshTokenEntity entity = new RefreshTokenEntity();
        entity.setId(bo.getId());
        entity.setToken(bo.getToken());
        entity.setUser(UserMapper.toEntity(bo.getUser()));
        entity.setExpiryDate(bo.getExpiryDate());
        entity.setRevoked(bo.isRevoked());
        entity.setCreatedAt(bo.getCreatedAt());
        entity.setRevokedAt(bo.getRevokedAt());
        return entity;
    }

    public static RefreshTokenBO toBO(RefreshTokenEntity entity) {
        if (entity == null) return null;

        RefreshTokenBO bo = new RefreshTokenBO();
        bo.setId(entity.getId());
        bo.setToken(entity.getToken());
        bo.setUser(UserMapper.toBO(entity.getUser()));
        bo.setExpiryDate(entity.getExpiryDate());
        bo.setRevoked(entity.isRevoked());
        bo.setCreatedAt(entity.getCreatedAt());
        bo.setRevokedAt(entity.getRevokedAt());
        return bo;
    }
}