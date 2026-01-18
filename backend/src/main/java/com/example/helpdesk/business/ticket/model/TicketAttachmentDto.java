package com.example.helpdesk.business.ticket.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketAttachmentDto {

	private Long fileId;
	private String filename;
}
