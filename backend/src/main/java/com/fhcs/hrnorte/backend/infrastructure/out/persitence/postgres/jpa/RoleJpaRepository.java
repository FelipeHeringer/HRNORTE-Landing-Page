package com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.entity.RoleEntity;

import java.util.Optional;

public interface RoleJpaRepository extends JpaRepository<RoleEntity, Integer> {

    Optional<RoleEntity> findByRoleName(String roleName);
}