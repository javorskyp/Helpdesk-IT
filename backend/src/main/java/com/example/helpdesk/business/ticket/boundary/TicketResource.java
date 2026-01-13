package com.example.helpdesk.business.ticket.boundary;

import com.example.helpdesk.business.ticket.control.TicketOperation;
import com.example.helpdesk.business.ticket.model.AddCommentRequest;
import com.example.helpdesk.business.ticket.model.CreateTicketRequest;
import com.example.helpdesk.business.ticket.model.TicketDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.NoSuchElementException;

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

	@GetMapping("/{ticketId}")
	public TicketDto getTicket(@PathVariable long ticketId) {
		return ticketOperation.getTicket(ticketId);
	}

	@PostMapping("/{ticketId}/comments")
	public TicketDto addComment(@PathVariable long ticketId, @RequestBody @Valid AddCommentRequest request) {
		return ticketOperation.addComment(ticketId, request);
	}

	@ExceptionHandler(NoSuchElementException.class)
	public ResponseEntity<Void> handleTicketNotFound() {
		return ResponseEntity.notFound().build();
	}
}
