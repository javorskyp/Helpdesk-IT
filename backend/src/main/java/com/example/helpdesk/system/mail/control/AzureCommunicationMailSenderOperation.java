package com.example.helpdesk.system.mail.control;

import com.azure.communication.email.EmailClient;
import com.azure.communication.email.EmailClientBuilder;
import com.azure.communication.email.models.EmailMessage;
import com.azure.communication.email.models.EmailSendResult;
import com.azure.core.credential.AzureKeyCredential;
import com.example.helpdesk.system.mail.boundary.MailSenderOperation;
import com.example.helpdesk.system.mail.model.MailMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

class AzureCommunicationMailSenderOperation implements MailSenderOperation {

    private static final Logger log = LoggerFactory.getLogger(AzureCommunicationMailSenderOperation.class);

    private final EmailClient emailClient;
    private final String sender;

    AzureCommunicationMailSenderOperation(String endpoint, String accessKey, String sender) {
        if (!StringUtils.hasText(endpoint)) {
            throw new IllegalArgumentException("Azure Communication endpoint is required");
        }
        if (!StringUtils.hasText(accessKey)) {
            throw new IllegalArgumentException("Azure Communication access key is required");
        }
        if (!StringUtils.hasText(sender)) {
            throw new IllegalArgumentException("Azure Communication sender address is required");
        }
        this.emailClient = new EmailClientBuilder()
            .endpoint(endpoint)
            .credential(new AzureKeyCredential(accessKey))
            .buildClient();
        this.sender = sender;
    }

    @Override
    public void send(MailMessage message) {
        EmailMessage email = new EmailMessage()
            .setSenderAddress(this.sender)
            .setSubject(message.getSubject())
            .setBodyPlainText(message.getBody())
            .setToRecipients(message.getTo());
        EmailSendResult result = emailClient.beginSend(email, null).waitForCompletion().getValue();
        log.info("Azure mail sent: id='{}' status='{}' to='{}'", result.getId(), result.getStatus(), message.getTo());
    }
}
