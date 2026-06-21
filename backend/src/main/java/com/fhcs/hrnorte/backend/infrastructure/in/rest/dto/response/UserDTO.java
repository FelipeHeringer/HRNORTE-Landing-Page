package com.fhcs.hrnorte.backend.infrastructure.in.rest.dto.response;

import java.util.UUID;

import com.fhcs.hrnorte.backend.core.domain.bo.UserBO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class UserDTO {

    private UUID userId;
    private String username;
    private String email;

    public static UserDTO fromUser(UserBO user) {

        return UserDTO.builder()
                .userId(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .build();
    }
}