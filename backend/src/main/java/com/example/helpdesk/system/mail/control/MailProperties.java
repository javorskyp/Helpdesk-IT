package com.example.helpdesk.system.mail.control;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.ArrayList;
import java.util.List;

@ConfigurationProperties(prefix = "helpdesk.mail")
public class MailProperties {

    private List<String> whitelist = new ArrayList<>();
    private Azure azure = new Azure();

    public List<String> getWhitelist() {
        return whitelist;
    }

    public void setWhitelist(List<String> whitelist) {
        this.whitelist = whitelist == null ? new ArrayList<>() : whitelist;
    }

    public Azure getAzure() {
        return azure;
    }

    public void setAzure(Azure azure) {
        this.azure = azure == null ? new Azure() : azure;
    }

    public static class Azure {

        private String endpoint;
        private String accessKey;
        private String sender;

        public String getEndpoint() {
            return endpoint;
        }

        public void setEndpoint(String endpoint) {
            this.endpoint = endpoint;
        }

        public String getAccessKey() {
            return accessKey;
        }

        public void setAccessKey(String accessKey) {
            this.accessKey = accessKey;
        }

        public String getSender() {
            return sender;
        }

        public void setSender(String sender) {
            this.sender = sender;
        }
    }
}
