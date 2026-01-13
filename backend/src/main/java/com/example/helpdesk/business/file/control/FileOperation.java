package com.example.helpdesk.business.file.control;

import com.example.helpdesk.business.file.model.FileUploadResponse;
import com.example.helpdesk.system.file.model.StoredFile;
import org.springframework.web.multipart.MultipartFile;

public interface FileOperation {

    FileUploadResponse store(long ticketId, MultipartFile file);

    StoredFile load(String fileId);
}


