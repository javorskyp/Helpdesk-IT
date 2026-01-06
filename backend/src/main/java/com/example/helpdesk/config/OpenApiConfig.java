package com.example.helpdesk.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

	@Bean
	public OpenAPI helpdeskOpenAPI() {
		return new OpenAPI()
			.info(new Info()
				.title("Helpdesk API")
				.description("Public API documentation for the Helpdesk service.")
				.version("v1.0.0"));
	}
}
