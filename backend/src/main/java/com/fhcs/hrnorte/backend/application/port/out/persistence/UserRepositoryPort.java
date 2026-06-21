package com.fhcs.hrnorte.backend.application.port.out.persistence;

import java.util.Optional;

import com.fhcs.hrnorte.backend.core.domain.bo.UserBO;

public interface UserRepositoryPort {
    UserBO save(UserBO userBO);
    Optional<UserBO> findByEmail(String email);
    Optional<UserBO> findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    void delete(UserBO userBO);
}
