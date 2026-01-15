package com.example.helpdesk.business.mail.boundary;

import com.example.helpdesk.business.mail.control.MailOperation;
import com.example.helpdesk.business.mail.model.SendMailRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mail")
@RequiredArgsConstructor
public class MailResource {

    private final MailOperation mailOperation;

    @PostMapping
    public ResponseEntity<Void> send(@RequestBody @Valid SendMailRequest request) {
        mailOperation.send(request);
        return ResponseEntity.accepted().build();
    }
}
