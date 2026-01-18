package com.example.helpdesk.business.user.model;

import lombok.Value;

@Value
public class Token {

    String jwt;
    long expirationInMs;

}
