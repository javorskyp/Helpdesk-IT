package com.example.helpdesk.system.file.boundary;

import com.example.helpdesk.system.file.model.StoredFile;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageOperation {

    StoredFile store(long ticketId, MultipartFile file);

    StoredFile load(String storageKey);
}


