package com.example.helpdesk.business.mail.control;

import com.example.helpdesk.business.mail.model.SendMailRequest;
import com.example.helpdesk.system.mail.boundary.MailSenderOperation;
import com.example.helpdesk.system.mail.model.MailMessage;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import java.util.List;

@RequiredArgsConstructor
class DefaultMailOperation implements MailOperation {

    private static final Logger log = LoggerFactory.getLogger(DefaultMailOperation.class);

    private final MailSenderOperation mailSenderOperation;
    private final List<String> whitelist;

    @Override
    public void send(SendMailRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Mail request is required");
        }
        if (!StringUtils.hasText(request.getTo())) {
            throw new IllegalArgumentException("Mail recipient is required");
        }
        if (!StringUtils.hasText(request.getSubject())) {
            throw new IllegalArgumentException("Mail subject is required");
        }
        if (!StringUtils.hasText(request.getBody())) {
            throw new IllegalArgumentException("Mail body is required");
        }
        if (!isWhitelisted(request.getTo())) {
            log.info("Mail recipient '{}' not in whitelist, skipping send.", request.getTo());
            return;
        }
        MailMessage message = new MailMessage(request.getTo(), request.getSubject(), request.getBody());
        mailSenderOperation.send(message);
    }

    private boolean isWhitelisted(String recipient) {
        for (String allowed : whitelist) {
            if (!StringUtils.hasText(allowed)) {
                continue;
            }
            if (allowed.trim().equalsIgnoreCase(recipient.trim())) {
                return true;
            }
        }
        return false;
    }
}
