package com.example.helpdesk.business.file.boundary;

import com.example.helpdesk.business.file.control.FileOperation;
import com.example.helpdesk.business.file.model.FileUploadResponse;
import com.example.helpdesk.system.file.model.StoredFile;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class FileResource {

    private final FileOperation fileOperation;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FileUploadResponse> upload(
            @RequestParam("ticketId") long ticketId,
            @RequestParam("file") MultipartFile file) {
        FileUploadResponse response = fileOperation.store(ticketId, file);
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping("/{fileId}")
    public ResponseEntity<Resource> download(@PathVariable String fileId) {
        StoredFile storedFile = fileOperation.load(fileId);
        ContentDisposition disposition = ContentDisposition.attachment()
                .filename(storedFile.getFilename())
                .build();
        MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;
        try {
            mediaType = MediaType.parseMediaType(storedFile.getContentType());
        } catch (InvalidMediaTypeException ignored) {
        }
        ResponseEntity.BodyBuilder responseBuilder = ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, disposition.toString())
                .contentType(mediaType);
        if (storedFile.getSize() >= 0) {
            responseBuilder.contentLength(storedFile.getSize());
        }
        return responseBuilder.body(storedFile.getResource());
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<Void> handleFileNotFound() {
        return ResponseEntity.notFound().build();
    }
}


