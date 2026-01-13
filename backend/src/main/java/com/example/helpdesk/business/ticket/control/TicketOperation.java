package com.example.helpdesk.business.ticket.control;

import com.example.helpdesk.business.ticket.model.AddCommentRequest;
import com.example.helpdesk.business.ticket.model.CreateTicketRequest;
import com.example.helpdesk.business.ticket.model.TicketDto;

import java.util.List;

public interface TicketOperation {

	TicketDto createTicket(CreateTicketRequest request);

	TicketDto addComment(long ticketId, AddCommentRequest request);

	TicketDto getTicket(long ticketId);

	List<TicketDto> listTickets();
}
