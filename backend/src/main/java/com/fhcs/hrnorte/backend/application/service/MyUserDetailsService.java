package com.fhcs.hrnorte.backend.application.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fhcs.hrnorte.backend.application.port.out.persistence.UserRepositoryPort;
import com.fhcs.hrnorte.backend.core.domain.bo.UserBO;
import com.fhcs.hrnorte.backend.core.domain.bo.UserDetailsImpl;

/**
 * Adaptador de Saída — implementa {@link UserDetailsService} do Spring
 * Security.
 *
 * <p>
 * Usa o {@link UserRepositoryPort} para buscar o usuário por username,
 * respeitando a inversão de dependência.
 * Retorna um {@link UserDetailsImpl} que adapta o UserBO para o Spring
 * Security.
 * </p>
 */
@Service
public class MyUserDetailsService implements UserDetailsService {

    private final UserRepositoryPort userRepositoryPort;

    public MyUserDetailsService(UserRepositoryPort userRepositoryPort) {
        this.userRepositoryPort = userRepositoryPort;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserBO userBO = userRepositoryPort.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Usuário não encontrado: " + username));
        return new UserDetailsImpl(userBO);
    }
}