package com.example.helpdesk.business.mail.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SendMailRequest {

    @NotBlank(message = "Mail recipient is required")
    private String to;

    @NotBlank(message = "Mail subject is required")
    private String subject;

    @NotBlank(message = "Mail body is required")
    private String body;
}
