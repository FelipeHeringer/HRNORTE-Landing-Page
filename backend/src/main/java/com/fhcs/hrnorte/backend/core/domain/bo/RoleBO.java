package com.fhcs.hrnorte.backend.core.domain.bo;

import com.fhcs.hrnorte.backend.core.domain.exception.DomainException;

public class RoleBO {

    private Integer id;
    private String roleName;
    private String description;

    // -------------------------------------------------------
    // Construtores
    // -------------------------------------------------------

    public RoleBO() {}

    public RoleBO(Integer id, String roleName, String description) {
        this.id = id;
        this.roleName = roleName;
        this.description = description;
    }

    // -------------------------------------------------------
    // Regras de negócio
    // -------------------------------------------------------

    public void validate() {
        if (isBlank(roleName)) {
            throw new DomainException("Nome do papel é obrigatório");
        }
        if (!roleName.startsWith("ROLE_")) {
            throw new DomainException("Nome do papel deve começar com 'ROLE_' (ex: ROLE_USER, ROLE_ADMIN)");
        }
    }

    // -------------------------------------------------------
    // Helpers
    // -------------------------------------------------------

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    // -------------------------------------------------------
    // Getters e Setters
    // -------------------------------------------------------

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getRoleName() { return roleName; }
    public void setRoleName(String roleName) { this.roleName = roleName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}