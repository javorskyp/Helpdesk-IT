package com.example.helpdesk.business.mail.control;

import com.example.helpdesk.system.mail.boundary.MailSenderOperation;
import com.example.helpdesk.system.mail.control.MailProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(MailProperties.class)
class MailConfiguration {

    @Bean
    MailOperation mailOperation(
        MailSenderOperation mailSenderOperation,
        MailProperties mailProperties) {
        return new DefaultMailOperation(mailSenderOperation, mailProperties.getWhitelist());
    }
}
