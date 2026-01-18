package com.example.helpdesk.business.ticket.boundary;

import com.example.helpdesk.business.ticket.control.TicketOperation;
import com.example.helpdesk.business.ticket.model.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketResource {

    private final TicketOperation ticketOperation;

    @PostMapping
    public ResponseEntity<TicketDto> createTicket(@RequestBody @Valid CreateTicketRequest request) {
        TicketDto created = ticketOperation.createTicket(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public List<TicketDto> listTickets() {
        return ticketOperation.listTickets();
    }

    @GetMapping("/current")
    public List<TicketDto> listTicketsForCurrentUser() {
        return ticketOperation.listTicketsForCurrentUser();
    }

    @GetMapping("/{ticketId}")
    public TicketDto getTicket(@PathVariable long ticketId) {
        return ticketOperation.getTicket(ticketId);
    }

    @PostMapping("/{ticketId}/comments")
    public TicketDto addComment(@PathVariable long ticketId, @RequestBody @Valid AddCommentRequest request) {
        return ticketOperation.addComment(ticketId, request);
    }

    @PutMapping("/{ticketId}/status")
    public TicketDto updateStatus(@PathVariable long ticketId, @RequestBody @Valid UpdateTicketStatusRequest request) {
        return ticketOperation.updateStatus(ticketId, request);
    }

    @PostMapping("/{ticketId}/rating")
    public TicketDto addRating(@PathVariable long ticketId, @RequestBody @Valid TicketRatingRequest request) {
        return ticketOperation.addRating(ticketId, request);
    }
}
