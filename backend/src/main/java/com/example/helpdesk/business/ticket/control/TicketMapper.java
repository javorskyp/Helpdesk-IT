package com.example.helpdesk.business.ticket.control;

import com.example.helpdesk.business.ticket.model.TicketAttachmentDto;
import com.example.helpdesk.business.ticket.model.TicketCommentDto;
import com.example.helpdesk.business.ticket.model.TicketDto;
import com.example.helpdesk.business.ticket.model.TicketEntity;
import org.springframework.stereotype.Component;

import java.util.List;

class TicketMapper {

	public TicketDto toDto(TicketEntity ticket) {
		List<TicketCommentDto> comments = ticket.getComments()
			.stream()
			.map(comment -> new TicketCommentDto(comment.getId(), comment.getContent()))
			.toList();
		List<TicketAttachmentDto> attachments = ticket.getAttachments()
			.stream()
			.map(attachment -> new TicketAttachmentDto(attachment.getId(), attachment.getFileId()))
			.toList();
		return new TicketDto(ticket.getId(), ticket.getTitle(), ticket.getDescription(), comments, attachments);
	}
}
