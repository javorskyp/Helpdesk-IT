package com.example.helpdesk.system.file.control;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import com.azure.storage.blob.models.BlobHttpHeaders;
import com.azure.storage.blob.models.BlobProperties;
import com.azure.storage.blob.options.BlobParallelUploadOptions;
import com.example.helpdesk.system.file.boundary.FileStorageOperation;
import com.example.helpdesk.system.file.model.StoredFile;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.util.NoSuchElementException;
import java.util.UUID;

class AzureBlobStorageOperation implements FileStorageOperation {

    private static final String DEFAULT_CONTENT_TYPE = "application/octet-stream";

    private final BlobContainerClient containerClient;

    AzureBlobStorageOperation(String connectionString, String containerName) {
        if (connectionString == null || connectionString.isBlank()) {
            throw new IllegalArgumentException("Azure Blob connection string is required");
        }
        if (containerName == null || containerName.isBlank()) {
            throw new IllegalArgumentException("Azure Blob container name is required");
        }
        BlobServiceClient serviceClient = new BlobServiceClientBuilder()
                .connectionString(connectionString)
                .buildClient();
        this.containerClient = serviceClient.getBlobContainerClient(containerName);
        if (!this.containerClient.exists()) {
            this.containerClient.create();
        }
    }

    @Override
    public StoredFile store(long ticketId, MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is required");
        }
        if (ticketId <= 0) {
            throw new IllegalArgumentException("Ticket id is required");
        }
        String originalName = normalizeFilename(file.getOriginalFilename());
        String storageKey = resolveStorageKey(ticketId, originalName);
        BlobClient blobClient = containerClient.getBlobClient(storageKey);
        String contentType = normalizeContentType(file.getContentType());
        BlobHttpHeaders headers = new BlobHttpHeaders().setContentType(contentType);
        try (InputStream inputStream = file.getInputStream()) {
            BlobParallelUploadOptions options = new BlobParallelUploadOptions(inputStream, file.getSize())
                    .setHeaders(headers);
            blobClient.uploadWithResponse(options, null, null);
        } catch (IOException ex) {
            throw new UncheckedIOException("Cannot store file", ex);
        }
        String filename = storageKey.substring(storageKey.lastIndexOf('/') + 1);
        return new StoredFile(storageKey, filename, contentType, file.getSize(), null);
    }

    @Override
    public StoredFile load(String storageKey) {
        BlobClient blobClient = containerClient.getBlobClient(storageKey);
        if (!blobClient.exists()) {
            throw new NoSuchElementException("File not found: " + storageKey);
        }
        BlobProperties properties = blobClient.getProperties();
        String contentType = normalizeContentType(properties.getContentType());
        long size = properties.getBlobSize();
        Resource resource = new InputStreamResource(blobClient.openInputStream());
        String filename = storageKey.substring(storageKey.lastIndexOf('/') + 1);
        return new StoredFile(storageKey, filename, contentType, size, resource);
    }

    private String normalizeFilename(String filename) {
        String cleaned = StringUtils.cleanPath(filename == null ? "" : filename);
        return cleaned.isBlank() ? "file" : cleaned;
    }

    private String normalizeContentType(String contentType) {
        return (contentType == null || contentType.isBlank()) ? DEFAULT_CONTENT_TYPE : contentType;
    }

    private String resolveStorageKey(long ticketId, String filename) {
        return "ticket" + ticketId + "/" + filename + "-" + UUID.randomUUID() + "/" + filename;
    }

}
