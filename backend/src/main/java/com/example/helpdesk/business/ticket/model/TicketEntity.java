package com.example.helpdesk.business.ticket.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tickets")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TicketEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String status;

    @Column
    private Integer rating;

    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TicketCommentEntity> comments = new ArrayList<>();

    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TicketAttachmentEntity> attachments = new ArrayList<>();

    public TicketEntity(String title, String description) {
        this.title = title;
        this.description = description;
        this.status = "WAITING_FOR_ADMIN_RESPONSE";
    }

    public void addComment(TicketCommentEntity comment) {
        comments.add(comment);
        comment.setTicket(this);
    }

    public void addAttachment(TicketAttachmentEntity attachment) {
        attachments.add(attachment);
        attachment.setTicket(this);
    }
}
