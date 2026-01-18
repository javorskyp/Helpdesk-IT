package com.example.helpdesk.business.user.model;

public record RefreshToken(
        String jwt,
        long expirationInMs
) {
}
