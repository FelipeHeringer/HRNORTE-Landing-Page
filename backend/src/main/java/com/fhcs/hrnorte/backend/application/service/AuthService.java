package com.fhcs.hrnorte.backend.application.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fhcs.hrnorte.backend.application.port.in.service.AuthServicePort;
import com.fhcs.hrnorte.backend.application.port.out.persistence.RefreshTokenRepositoryPort;
import com.fhcs.hrnorte.backend.application.port.out.persistence.RoleRepositoryPort;
import com.fhcs.hrnorte.backend.application.port.out.persistence.UserRepositoryPort;
import com.fhcs.hrnorte.backend.application.port.out.security.JwtPort;
import com.fhcs.hrnorte.backend.application.port.out.security.PasswordEncoderPort;
import com.fhcs.hrnorte.backend.core.domain.bo.RefreshTokenBO;
import com.fhcs.hrnorte.backend.core.domain.bo.RoleBO;
import com.fhcs.hrnorte.backend.core.domain.bo.TokenBO;
import com.fhcs.hrnorte.backend.core.domain.bo.UserBO;
import com.fhcs.hrnorte.backend.core.domain.exception.DomainException;
import com.fhcs.hrnorte.backend.core.domain.exception.InvalidTokenException;

import java.time.Instant;
import java.util.UUID;

@Service
@Transactional
public class AuthService implements AuthServicePort {

    private final UserRepositoryPort userRepositoryPort;
    private final RoleRepositoryPort roleRepositoryPort;
    private final RefreshTokenRepositoryPort refreshTokenRepositoryPort;
    private final JwtPort jwtPort;
    private final PasswordEncoderPort passwordEncoderPort;

    @Value("${token.refresh-token-expiration}")
    private long refreshTokenExpirationMs;

    public AuthService(UserRepositoryPort userRepositoryPort,
                       RoleRepositoryPort roleRepositoryPort,
                       RefreshTokenRepositoryPort refreshTokenRepositoryPort,
                       JwtPort jwtPort,
                       PasswordEncoderPort passwordEncoderPort) {
        this.userRepositoryPort = userRepositoryPort;
        this.roleRepositoryPort = roleRepositoryPort;
        this.refreshTokenRepositoryPort = refreshTokenRepositoryPort;
        this.jwtPort = jwtPort;
        this.passwordEncoderPort = passwordEncoderPort;
    }

    // -------------------------------------------------------
    // Caso de uso: Register
    // -------------------------------------------------------

    @Override
    public TokenBO register(String username, String email, String rawPassword) {

        // 1. Verificar unicidade (regra de negócio de aplicação)
        if (userRepositoryPort.existsByUsername(username)) {
            throw new DomainException("Nome de usuário já está em uso");
        }
        if (userRepositoryPort.existsByEmail(email)) {
            throw new DomainException("E-mail já está em uso");
        }

        // 2. Criar o BO — as validações de formato ficam no próprio UserBO
        String passwordHash = passwordEncoderPort.encode(rawPassword);
        UserBO userBO = UserBO.create(username, email, passwordHash);

        // 3. Atribuir role padrão
        RoleBO defaultRole = roleRepositoryPort.findByRoleName("ROLE_USER")
                .orElseThrow(() -> new DomainException("Role padrão ROLE_USER não encontrada no sistema"));
        userBO.addRole(defaultRole);

        // 4. Persistir
        UserBO savedUser = userRepositoryPort.save(userBO);

        // 5. Gerar tokens e retornar
        return buildTokenBO(savedUser);
    }

    // -------------------------------------------------------
    // Caso de uso: Login
    // -------------------------------------------------------

    @Override
    public TokenBO login(String email, String rawPassword) {

        // 1. Buscar usuário
        UserBO userBO = userRepositoryPort.findByEmail(email)
                .orElseThrow(() -> new DomainException("Credenciais inválidas"));

        // 2. Verificar senha
        if (!passwordEncoderPort.matches(rawPassword, userBO.getPasswordHash())) {
            throw new DomainException("Credenciais inválidas");
        }

        // 3. Verificar se conta está ativa
        if (!userBO.isActive()) {
            throw new DomainException("Conta de usuário desativada");
        }

        // 4. Gerar tokens e retornar
        return buildTokenBO(userBO);
    }

    // -------------------------------------------------------
    // Caso de uso: Refresh
    // -------------------------------------------------------

    @Override
    public TokenBO refresh(String refreshToken) {

        // 1. Buscar refresh token persistido
        RefreshTokenBO refreshTokenBO = refreshTokenRepositoryPort.findByToken(refreshToken)
                .orElseThrow(() -> new InvalidTokenException("Refresh token não encontrado"));

        // 2. Validar via regra de domínio do BO (revogado / expirado)
        if (refreshTokenBO.isExpired()) {
            refreshTokenRepositoryPort.delete(refreshTokenBO);
            throw new InvalidTokenException("Refresh token expirado");
        }
        refreshTokenBO.validateUsability();

        // 3. Buscar usuário atualizado
        UserBO userBO = refreshTokenBO.getUser();

        // 4. Gerar novo access token (refresh token permanece o mesmo)
        String newAccessToken = jwtPort.generateAccessToken(userBO);
        long expiresIn = jwtPort.getAccessTokenExpiration(newAccessToken);

        return new TokenBO(newAccessToken, refreshToken, expiresIn, userBO);
    }

    // -------------------------------------------------------
    // Caso de uso: Logout
    // -------------------------------------------------------

    @Override
    public void logout(String refreshToken) {
        if (refreshToken != null && !refreshToken.isBlank()) {
            refreshTokenRepositoryPort.revokeByToken(refreshToken);
        }
    }

    // -------------------------------------------------------
    // Helpers privados
    // -------------------------------------------------------

    private TokenBO buildTokenBO(UserBO userBO) {
        String accessToken = jwtPort.generateAccessToken(userBO);
        String refreshToken = UUID.randomUUID().toString();
        long expiresIn = jwtPort.getAccessTokenExpiration(accessToken);

        // Persistir refresh token
        RefreshTokenBO refreshTokenBO = new RefreshTokenBO();
        refreshTokenBO.setToken(refreshToken);
        refreshTokenBO.setUser(userBO);
        refreshTokenBO.setExpiryDate(Instant.now().plusMillis(refreshTokenExpirationMs));
        refreshTokenBO.setCreatedAt(Instant.now());
        refreshTokenBO.setRevoked(false);
        refreshTokenRepositoryPort.save(refreshTokenBO);

        return new TokenBO(accessToken, refreshToken, expiresIn, userBO);
    }
}