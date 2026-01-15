package com.example.helpdesk.system.mail.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MailMessage {

    private final String to;
    private final String subject;
    private final String body;
}
