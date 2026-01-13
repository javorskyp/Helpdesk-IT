package com.example.helpdesk.system.file.control;

import com.example.helpdesk.system.file.boundary.FileStorageOperation;
import com.example.helpdesk.system.file.model.StoredFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.NoSuchElementException;
import java.util.UUID;

class LocalFileSystemStorageOperation implements FileStorageOperation {

    private static final String DEFAULT_CONTENT_TYPE = "application/octet-stream";

    private final Path rootPath;

    LocalFileSystemStorageOperation(Path rootPath) {
        this.rootPath = rootPath.toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.rootPath);
        } catch (IOException ex) {
            throw new UncheckedIOException("Cannot create storage directory", ex);
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
        Path ticketDir = rootPath.resolve(String.valueOf(ticketId));
        try {
            Files.createDirectories(ticketDir);
            String originalName = normalizeFilename(file.getOriginalFilename());
            Path targetPath = resolveTargetPath(ticketDir, originalName);
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);
            }
            String contentType = normalizeContentType(file.getContentType());
            String storageKey = ticketId + "/" + targetPath.getFileName();
            return new StoredFile(storageKey, targetPath.getFileName().toString(), contentType, file.getSize(), null);
        } catch (IOException ex) {
            throw new UncheckedIOException("Cannot store file", ex);
        }
    }

    @Override
    public StoredFile load(String storageKey) {
        Path filePath = rootPath.resolve(storageKey).normalize();
        if (!filePath.startsWith(rootPath)) {
            throw new NoSuchElementException("File not found: " + storageKey);
        }
        if (!Files.exists(filePath)) {
            throw new NoSuchElementException("File not found: " + storageKey);
        }
        String filename = filePath.getFileName().toString();
        String contentType = probeContentType(filePath);
        long size = readSize(filePath);
        Resource resource = toResource(filePath, storageKey);
        return new StoredFile(storageKey, filename, contentType, size, resource);
    }

    private String normalizeFilename(String filename) {
        String cleaned = StringUtils.cleanPath(filename == null ? "" : filename);
        return cleaned.isBlank() ? "file" : cleaned;
    }

    private String normalizeContentType(String contentType) {
        return (contentType == null || contentType.isBlank()) ? DEFAULT_CONTENT_TYPE : contentType;
    }

    private long readSize(Path filePath) {
        try {
            return Files.size(filePath);
        } catch (IOException ex) {
            return -1L;
        }
    }

    private String probeContentType(Path filePath) {
        try {
            return normalizeContentType(Files.probeContentType(filePath));
        } catch (IOException ex) {
            return DEFAULT_CONTENT_TYPE;
        }
    }

    private Resource toResource(Path filePath, String storageKey) {
        try {
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists()) {
                throw new NoSuchElementException("File not found: " + storageKey);
            }
            return resource;
        } catch (MalformedURLException ex) {
            throw new IllegalStateException("Invalid file location", ex);
        }
    }

    private Path resolveTargetPath(Path ticketDir, String filename) {
        Path candidate = ticketDir.resolve(filename).normalize();
        if (!candidate.startsWith(ticketDir)) {
            candidate = ticketDir.resolve("file").normalize();
        }
        if (!Files.exists(candidate)) {
            return candidate;
        }
        String uniqueName = uniqueFilename(filename);
        return ticketDir.resolve(uniqueName).normalize();
    }

    private String uniqueFilename(String filename) {
        String base = filename;
        String extension = "";
        int dotIndex = filename.lastIndexOf('.');
        if (dotIndex > 0 && dotIndex < filename.length() - 1) {
            base = filename.substring(0, dotIndex);
            extension = filename.substring(dotIndex);
        }
        return base + "-" + UUID.randomUUID() + extension;
    }
}

