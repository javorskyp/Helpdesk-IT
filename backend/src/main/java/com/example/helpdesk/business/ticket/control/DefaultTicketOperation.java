package com.example.helpdesk.business.ticket.control;

import com.example.helpdesk.business.ticket.model.*;
import com.example.helpdesk.business.user.model.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
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
        UserEntity currentUser = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        TicketEntity ticket = new TicketEntity(request.getTitle(), request.getDescription(), currentUser);
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

    @Override
    @Transactional(readOnly = true)
    public List<TicketDto> listTicketsForCurrentUser() {
        UserEntity currentUser = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ticketRepository.findByUser(currentUser)
                .stream()
                .map(ticketMapper::toDto)
                .toList();
    }

    @Override
    @Transactional
    public TicketDto updateStatus(long ticketId, UpdateTicketStatusRequest request) {
        TicketEntity ticket = findTicket(ticketId);
        ticket.setStatus(request.getStatus());
        TicketEntity saved = ticketRepository.save(ticket);
        return ticketMapper.toDto(saved);
    }

    @Override
    @Transactional
    public TicketDto addRating(long ticketId, TicketRatingRequest request) {
        TicketEntity ticket = findTicket(ticketId);
        ticket.setRating(request.getRating());
        TicketEntity saved = ticketRepository.save(ticket);
        return ticketMapper.toDto(saved);
    }

    private TicketEntity findTicket(long ticketId) {
        return ticketRepository.findById(ticketId)
                .orElseThrow(() -> new NoSuchElementException("Ticket not found: " + ticketId));
    }

}
