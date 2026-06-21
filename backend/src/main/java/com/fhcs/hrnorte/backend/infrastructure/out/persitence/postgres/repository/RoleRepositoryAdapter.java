package com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.repository;

import org.springframework.stereotype.Repository;

import com.fhcs.hrnorte.backend.application.port.out.persistence.RoleRepositoryPort;
import com.fhcs.hrnorte.backend.core.domain.bo.RoleBO;
import com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.jpa.RoleJpaRepository;
import com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.mapper.RoleMapper;

import java.util.Optional;

@Repository
public class RoleRepositoryAdapter implements RoleRepositoryPort {

    private final RoleJpaRepository roleJpaRepository;

    public RoleRepositoryAdapter(RoleJpaRepository roleJpaRepository) {
        this.roleJpaRepository = roleJpaRepository;
    }

    @Override
    public Optional<RoleBO> findByRoleName(String roleName) {
        return roleJpaRepository.findByRoleName(roleName)
                .map(RoleMapper::toBO);
    }
}