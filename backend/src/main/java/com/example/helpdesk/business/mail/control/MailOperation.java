package com.example.helpdesk.business.mail.control;

import com.example.helpdesk.business.mail.model.SendMailRequest;

public interface MailOperation {

    void send(SendMailRequest request);
}
