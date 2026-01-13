package com.example.helpdesk.business.ticket.control;

import com.example.helpdesk.business.ticket.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
class DefaultTicketOperation implements TicketOperation {

	private final TicketRepository ticketRepository;
	private final TicketMapper ticketMapper;

	@Override
	@Transactional
	public TicketDto createTicket(CreateTicketRequest request) {
		TicketEntity ticket = new TicketEntity(request.getTitle(), request.getDescription());
		TicketEntity saved = ticketRepository.save(ticket);
		return ticketMapper.toDto(saved);
	}

	@Override
	@Transactional
	public TicketDto addComment(long ticketId, AddCommentRequest request) {
		TicketEntity ticket = findTicket(ticketId);
		TicketCommentEntity comment = new TicketCommentEntity(request.getContent());
		ticket.addComment(comment);
		TicketEntity saved = ticketRepository.save(ticket);
		return ticketMapper.toDto(saved);
	}

	@Override
	@Transactional(readOnly = true)
	public TicketDto getTicket(long ticketId) {
		return ticketMapper.toDto(findTicket(ticketId));
	}

	@Override
	@Transactional(readOnly = true)
	public List<TicketDto> listTickets() {
		return ticketRepository.findAll()
			.stream()
			.map(ticketMapper::toDto)
			.toList();
	}

	private TicketEntity findTicket(long ticketId) {
		return ticketRepository.findById(ticketId)
			.orElseThrow(() -> new NoSuchElementException("Ticket not found: " + ticketId));
	}

}
