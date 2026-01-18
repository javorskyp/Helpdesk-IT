package com.example.helpdesk.business.user.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginUserRequest(
        @NotBlank @Size(max = 100) @Email String email,
        @NotBlank @Size(min = 8, max = 64) String password
) {
}
