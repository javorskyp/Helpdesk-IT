package com.example.helpdesk.system.mail.control;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.ArrayList;
import java.util.List;

@ConfigurationProperties(prefix = "helpdesk.mail")
public class MailProperties {

    private List<String> whitelist = new ArrayList<>();

    public List<String> getWhitelist() {
        return whitelist;
    }

    public void setWhitelist(List<String> whitelist) {
        this.whitelist = whitelist == null ? new ArrayList<>() : whitelist;
    }
}
