package com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import com.fhcs.hrnorte.backend.core.domain.bo.RoleBO;
import com.fhcs.hrnorte.backend.core.domain.bo.UserBO;
import com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.entity.RoleEntity;
import com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.entity.UserEntity;

public final class UserMapper {

    private UserMapper() {}

    public static UserEntity toEntity(UserBO bo) {
        if (bo == null) return null;

        UserEntity entity = new UserEntity();
        entity.setId(bo.getId());
        entity.setUsername(bo.getUsername());
        entity.setEmail(bo.getEmail());
        entity.setPasswordHash(bo.getPasswordHash());
        entity.setActive(bo.isActive());

        if (bo.getRoles() != null) {
            Set<RoleEntity> roleEntities = bo.getRoles().stream()
                    .map(RoleMapper::toEntity)
                    .collect(Collectors.toSet());
            entity.setRoles(roleEntities);
        }

        return entity;
    }

    public static UserBO toBO(UserEntity entity) {
        if (entity == null) return null;

        UserBO bo = new UserBO();
        bo.setId(entity.getId());
        bo.setUsername(entity.getUsername());
        bo.setEmail(entity.getEmail());
        bo.setPasswordHash(entity.getPasswordHash());
        bo.setActive(entity.isActive());

        if (entity.getRoles() != null) {
            Set<RoleBO> roleBOs = entity.getRoles().stream()
                    .map(RoleMapper::toBO)
                    .collect(Collectors.toSet());
            bo.setRoles(roleBOs);
        }

        return bo;
    }
}