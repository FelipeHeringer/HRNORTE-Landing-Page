package com.fhcs.hrnorte.backend.core.domain.bo;


import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import com.fhcs.hrnorte.backend.core.domain.exception.DomainException;

public class UserBO {

    private UUID id;
    private String username;
    private String email;
    private String passwordHash;
    private boolean active;
    private Set<RoleBO> roles;

    public UserBO() {
        this.roles = new HashSet<>();
        this.active = true;
    }

    public UserBO(UUID id, String username, String email,
                  String passwordHash, boolean active, Set<RoleBO> roles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.active = active;
        this.roles = roles != null ? roles : new HashSet<>();
    }

    public static UserBO create(String username, String email, String passwordHash) {
        UserBO user = new UserBO();
        user.setId(UUID.randomUUID());
        user.setUsername(username);
        user.setEmail(email);
        user.setPasswordHash(passwordHash);
        user.validate();
        return user;
    }

    // -------------------------------------------------------
    // Regras de negócio
    // -------------------------------------------------------

    public void validate() {
        validateUsername();
        validateEmail();
        validatePassword();
    }

    public void validateUsername() {
        if (isBlank(username)) {
            throw new DomainException("Nome de usuário é obrigatório");
        }
        if (username.length() < 3 || username.length() > 50) {
            throw new DomainException("Nome de usuário deve ter entre 3 e 50 caracteres");
        }
        if (!username.matches("^[a-zA-Z0-9_]+$")) {
            throw new DomainException("Nome de usuário pode conter somente letras, números e underline");
        }
    }

    public void validateEmail() {
        if (isBlank(email)) {
            throw new DomainException("E-mail é obrigatório");
        }
        if (!email.contains("@") || email.length() > 255) {
            throw new DomainException("Formato de e-mail inválido");
        }
    }

    public void validatePassword() {
        if (isBlank(passwordHash)) {
            throw new DomainException("Senha é obrigatória");
        }
    }

    public boolean hasRole(String roleName) {
        return roles.stream()
                .anyMatch(role -> role.getRoleName().equalsIgnoreCase(roleName));
    }

    public void addRole(RoleBO role) {
        if (role == null) {
            throw new DomainException("Role não pode ser nula");
        }
        this.roles.add(role);
    }

    public void activate() {
        this.active = true;
    }

    public void deactivate() {
        this.active = false;
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

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public Set<RoleBO> getRoles() { return roles; }
    public void setRoles(Set<RoleBO> roles) { this.roles = roles != null ? roles : new HashSet<>(); }

}