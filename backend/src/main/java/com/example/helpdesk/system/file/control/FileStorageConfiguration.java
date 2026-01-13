package com.example.helpdesk.system.file.control;

import com.example.helpdesk.system.file.boundary.FileStorageOperation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Path;

@Configuration
class FileStorageConfiguration {

	@Bean
	FileStorageOperation fileStorageOperation(
		@Value("${helpdesk.storage.local-root:storage}") String localRoot) {
		return new LocalFileSystemStorageOperation(Path.of(localRoot));
	}
}
