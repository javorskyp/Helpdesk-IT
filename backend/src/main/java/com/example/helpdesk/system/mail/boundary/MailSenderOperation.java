package com.example.helpdesk.system.mail.boundary;

import com.example.helpdesk.system.mail.model.MailMessage;

public interface MailSenderOperation {

    void send(MailMessage message);
}
