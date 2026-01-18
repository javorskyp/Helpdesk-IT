package com.example.helpdesk.business.user.model;

import lombok.Builder;

@Builder
public record User(
        String email,
        String firstName,
        String lastName,
        String role
) {
}
