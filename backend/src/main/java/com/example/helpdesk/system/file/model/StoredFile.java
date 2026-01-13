package com.example.helpdesk.system.file.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;

@Getter
@RequiredArgsConstructor
public class StoredFile {

    private final String id;
    private final String filename;
    private final String contentType;
    private final long size;
    private final Resource resource;
}


