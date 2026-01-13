package com.example.helpdesk.business.file.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileUploadResponse {

	private Long id;
	private String filename;
	private String contentType;
	private long size;
}
