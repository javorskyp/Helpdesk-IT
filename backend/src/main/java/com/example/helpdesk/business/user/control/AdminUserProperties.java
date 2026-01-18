package com.example.helpdesk.business.user.control;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Setter
@Getter
@ConfigurationProperties(prefix = "helpdesk.admin")
public class AdminUserProperties {

    private String email;
    private String password;

}
