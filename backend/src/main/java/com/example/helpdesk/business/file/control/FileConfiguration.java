package com.example.helpdesk.business.file.control;

import com.example.helpdesk.business.file.model.FileRepository;
import com.example.helpdesk.system.file.boundary.FileStorageOperation;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class FileConfiguration {

	@Bean
	FileOperation fileOperation(FileRepository fileRepository, FileStorageOperation fileStorageOperation) {
		return new DefaultFileOperation(fileRepository, fileStorageOperation);
	}
}
