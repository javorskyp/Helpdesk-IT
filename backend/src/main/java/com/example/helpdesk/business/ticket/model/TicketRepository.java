package com.example.helpdesk.business.ticket.model;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.helpdesk.business.user.model.UserEntity;

import java.util.List;

public interface TicketRepository extends JpaRepository<TicketEntity, Long> {
    List<TicketEntity> findByUser(UserEntity user);
}
