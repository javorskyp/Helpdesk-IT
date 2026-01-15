package com.example.helpdesk.system.mail.control;

import com.example.helpdesk.system.mail.boundary.MailSenderOperation;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class MailSenderConfiguration {

    @Bean
    MailSenderOperation mailSenderOperation() {
        return new MockMailSenderOperation();
    }
}
