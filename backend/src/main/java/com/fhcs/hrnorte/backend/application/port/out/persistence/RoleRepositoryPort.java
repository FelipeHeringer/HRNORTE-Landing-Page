package com.fhcs.hrnorte.backend.application.port.out.persistence;

import java.util.Optional;

import com.fhcs.hrnorte.backend.core.domain.bo.RoleBO;

public interface RoleRepositoryPort {

    Optional<RoleBO> findByRoleName(String roleName);
}