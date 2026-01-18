package com.example.helpdesk.business.file.control;

import com.example.helpdesk.business.file.model.FileEntity;
import com.example.helpdesk.business.file.model.FileRepository;
import com.example.helpdesk.business.file.model.FileUploadResponse;
import com.example.helpdesk.business.ticket.model.TicketAttachmentEntity;
import com.example.helpdesk.business.ticket.model.TicketEntity;
import com.example.helpdesk.business.ticket.model.TicketRepository;
import com.example.helpdesk.system.file.boundary.FileStorageOperation;
import com.example.helpdesk.system.file.model.StoredFile;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
class DefaultFileOperation implements FileOperation {

    private final FileRepository fileRepository;
    private final FileStorageOperation fileStorageOperation;
    private final TicketRepository ticketRepository;

    @Override
    @Transactional
    public FileUploadResponse store(long ticketId, MultipartFile file) {
        TicketEntity ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new java.util.NoSuchElementException("Ticket not found: " + ticketId));
        StoredFile storedFile = fileStorageOperation.store(ticketId, file);
        FileEntity entity = new FileEntity(
                storedFile.getId(),
                storedFile.getFilename(),
                storedFile.getContentType(),
                storedFile.getSize());
        FileEntity saved = fileRepository.save(entity);
        ticket.addAttachment(new TicketAttachmentEntity(saved.getId(), saved.getFilename()));
        ticketRepository.save(ticket);
        return new FileUploadResponse(
                saved.getId(),
                saved.getFilename(),
                saved.getContentType(),
                saved.getSize());
    }

    @Override
    public StoredFile load(String fileId) {
        Long id = parseId(fileId);
        FileEntity entity = fileRepository.findById(id)
                .orElseThrow(() -> new java.util.NoSuchElementException("File not found: " + fileId));
        StoredFile storedFile = fileStorageOperation.load(entity.getStorageKey());
        return new StoredFile(
                fileId,
                entity.getFilename(),
                entity.getContentType(),
                entity.getSize(),
                storedFile.getResource());
    }

    private Long parseId(String fileId) {
        try {
            return Long.parseLong(fileId);
        } catch (NumberFormatException ex) {
            throw new java.util.NoSuchElementException("File not found: " + fileId);
        }
    }
}


