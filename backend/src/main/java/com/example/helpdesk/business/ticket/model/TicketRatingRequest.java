package com.example.helpdesk.business.ticket.model;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketRatingRequest {

	@NotNull(message = "Rating is required")
	private Integer rating;
}
