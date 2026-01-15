package com.example.helpdesk.system.file.control;

import com.example.helpdesk.system.file.boundary.FileStorageOperation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;

import java.nio.file.Path;

@Configuration
class FileStorageConfiguration {

	@Bean
	@Profile("azure")
	FileStorageOperation azureFileStorageOperation(
		@Value("${helpdesk.storage.azure.connection-string:}") String azureConnectionString,
		@Value("${helpdesk.storage.azure.container:helpdesk-files}") String azureContainer) {
		return new AzureBlobStorageOperation(azureConnectionString, azureContainer);
	}

	@Bean
	@ConditionalOnMissingBean(FileStorageOperation.class)
	FileStorageOperation localFileStorageOperation(
		@Value("${helpdesk.storage.local-root:storage}") String localRoot) {
		return new LocalFileSystemStorageOperation(Path.of(localRoot));
	}
}
