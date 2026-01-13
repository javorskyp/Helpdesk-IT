package com.example.helpdesk.business.ticket.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketDto {

	private Long id;
	private String title;
	private String description;
	private List<TicketCommentDto> comments = new ArrayList<>();
}
