package com.example.helpdesk.business.user.model;

import lombok.Builder;

@Builder
public record AuthResponse(
        AccessToken accessToken,
        RefreshToken refreshToken
) {
}
