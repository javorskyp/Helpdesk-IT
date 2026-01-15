package com.example.helpdesk.system.mail.control;

import com.example.helpdesk.system.mail.boundary.MailSenderOperation;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
class MailSenderConfiguration {

    @Bean
    @Profile("azure")
    MailSenderOperation azureMailSenderOperation(MailProperties mailProperties) {
        MailProperties.Azure azure = mailProperties.getAzure();
        return new AzureCommunicationMailSenderOperation(
            azure.getEndpoint(),
            azure.getAccessKey(),
            azure.getSender());
    }

    @Bean
    @ConditionalOnMissingBean(MailSenderOperation.class)
    MailSenderOperation mailSenderOperation() {
        return new MockMailSenderOperation();
    }
}
