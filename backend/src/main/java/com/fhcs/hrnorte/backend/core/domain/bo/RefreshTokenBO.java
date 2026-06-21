package com.fhcs.hrnorte.backend.core.domain.bo;

import java.time.Instant;

import com.fhcs.hrnorte.backend.core.domain.exception.InvalidTokenException;

public class RefreshTokenBO {

    private Integer id;
    private String token;
    private UserBO user;
    private Instant expiryDate;
    private boolean revoked;
    private Instant createdAt;
    private Instant revokedAt;

    // -------------------------------------------------------
    // Regras de negócio
    // -------------------------------------------------------

    public void validateUsability() {
        if (revoked) {
            throw new InvalidTokenException("Refresh token foi revogado");
        }
        if (isExpired()) {
            throw new InvalidTokenException("Refresh token expirado");
        }
    }

    public boolean isExpired() {
        return Instant.now().isAfter(this.expiryDate);
    }

    public void revoke() {
        this.revoked = true;
        this.revokedAt = Instant.now();
    }

    // -------------------------------------------------------
    // Getters e Setters
    // -------------------------------------------------------

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public UserBO getUser() { return user; }
    public void setUser(UserBO user) { this.user = user; }

    public Instant getExpiryDate() { return expiryDate; }
    public void setExpiryDate(Instant expiryDate) { this.expiryDate = expiryDate; }

    public boolean isRevoked() { return revoked; }
    public void setRevoked(boolean revoked) { this.revoked = revoked; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getRevokedAt() { return revokedAt; }
    public void setRevokedAt(Instant revokedAt) { this.revokedAt = revokedAt; }
}
