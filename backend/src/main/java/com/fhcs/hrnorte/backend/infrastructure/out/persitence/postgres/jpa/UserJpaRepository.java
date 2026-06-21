package com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.entity.UserEntity;

import java.util.Optional;

public interface UserJpaRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByEmail(String email);
    Optional<UserEntity> findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}