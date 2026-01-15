package com.example.helpdesk.system.mail.control;

import com.example.helpdesk.system.mail.boundary.MailSenderOperation;
import com.example.helpdesk.system.mail.model.MailMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

class MockMailSenderOperation implements MailSenderOperation {

    private static final Logger log = LoggerFactory.getLogger(MockMailSenderOperation.class);

    @Override
    public void send(MailMessage message) {
        log.debug("[MOCK] Mail sent: to='{}' subject='{}' body='{}'", message.getTo(), message.getSubject(), message.getBody());
    }
}
