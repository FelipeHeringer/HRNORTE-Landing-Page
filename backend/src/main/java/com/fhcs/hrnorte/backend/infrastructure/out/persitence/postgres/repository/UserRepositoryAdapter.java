package com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.repository;

import org.springframework.stereotype.Repository;

import com.fhcs.hrnorte.backend.application.port.out.persistence.UserRepositoryPort;
import com.fhcs.hrnorte.backend.core.domain.bo.UserBO;
import com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.entity.UserEntity;
import com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.jpa.UserJpaRepository;
import com.fhcs.hrnorte.backend.infrastructure.out.persitence.postgres.mapper.UserMapper;

import java.util.Optional;

@Repository
public class UserRepositoryAdapter implements UserRepositoryPort {

    private final UserJpaRepository userJpaRepository;

    public UserRepositoryAdapter(UserJpaRepository userJpaRepository) {
        this.userJpaRepository = userJpaRepository;
    }

    @Override
    public UserBO save(UserBO userBO) {
        UserEntity entity = UserMapper.toEntity(userBO);
        UserEntity saved = userJpaRepository.save(entity);
        return UserMapper.toBO(saved);
    }

    @Override
    public Optional<UserBO> findByEmail(String email) {
        return userJpaRepository.findByEmail(email)
                .map(UserMapper::toBO);
    }

    @Override
    public Optional<UserBO> findByUsername(String username) {
        return userJpaRepository.findByUsername(username)
                .map(UserMapper::toBO);
    }

    @Override
    public boolean existsByUsername(String username) {
        return userJpaRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userJpaRepository.existsByEmail(email);
    }

    @Override
    public void delete(UserBO userBO) {
        UserEntity entity = UserMapper.toEntity(userBO);
        userJpaRepository.delete(entity);
    }
}