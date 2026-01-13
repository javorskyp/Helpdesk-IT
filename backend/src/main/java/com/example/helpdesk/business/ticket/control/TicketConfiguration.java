package com.example.helpdesk.business.ticket.control;

import com.example.helpdesk.business.ticket.model.TicketRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class TicketConfiguration {

    @Bean
    TicketOperation ticketOperation(TicketRepository ticketRepository) {
        return new DefaultTicketOperation(ticketRepository, new TicketMapper());
    }
}
