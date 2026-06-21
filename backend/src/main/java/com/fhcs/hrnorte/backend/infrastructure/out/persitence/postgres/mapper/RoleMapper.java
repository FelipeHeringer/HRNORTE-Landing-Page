package com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.mapper;

import com.fhcs.hrnorte.backend.core.domain.bo.RoleBO;
import com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.entity.RoleEntity;

public final class RoleMapper {

    private RoleMapper() {}

    public static RoleEntity toEntity(RoleBO bo) {
        if (bo == null) return null;

        RoleEntity entity = new RoleEntity();
        entity.setId(bo.getId());
        entity.setRoleName(bo.getRoleName());
        entity.setDescription(bo.getDescription());
        return entity;
    }

    public static RoleBO toBO(RoleEntity entity) {
        if (entity == null) return null;

        RoleBO bo = new RoleBO();
        bo.setId(entity.getId());
        bo.setRoleName(entity.getRoleName());
        bo.setDescription(entity.getDescription());
        return bo;
    }
}