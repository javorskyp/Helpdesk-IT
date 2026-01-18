package com.example.helpdesk.system.security.control;

import com.example.helpdesk.business.user.model.Token;
import com.example.helpdesk.business.user.model.UserEntity;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;

@Component
@Slf4j
public class JwtUtils {

    private final String jwtSecret;
    private final long accessTokenExpirationInMs;

    @Getter
    private final long refreshTokenExpirationInMs;

    public JwtUtils(@Value("${helpdesk.jwt.secret}") String jwtSecret, @Value("${helpdesk.jwt.access-expiration}") long accessTokenExpirationInMs,
                    @Value("${helpdesk.jwt.refresh-expiration}") long refreshTokenExpirationInMs) {
        this.jwtSecret = jwtSecret;
        this.accessTokenExpirationInMs = accessTokenExpirationInMs;
        this.refreshTokenExpirationInMs = refreshTokenExpirationInMs;
    }

    public Token createAccessToken(UserEntity user) {
        String accessToken = createJwt(user.getEmail(), accessTokenExpirationInMs);
        return new Token(accessToken, accessTokenExpirationInMs);
    }

    public Token createRefreshToken(UserEntity user) {
        String refreshToken = createJwt(user.getEmail(), refreshTokenExpirationInMs);
        return new Token(refreshToken, refreshTokenExpirationInMs);
    }

    public boolean isValid(String jwt) {
        try {
            SecretKey key = getJwtSecretKey();
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt);
            return true;
        } catch (Exception e) {
            log.error("Invalid Jwt  {}", e.getMessage());
            return false;
        }
    }

    public String getUsernameFromJwt(String jwt) {
        SecretKey key = getJwtSecretKey();
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody().getSubject();
    }

    private String createJwt(String userEmail, long expiration) {
        Instant now = Instant.now();
        SecretKey key = getJwtSecretKey();
        return Jwts.builder()
                .setSubject(userEmail)
                .setExpiration(Date.from(now.plusMillis(expiration)))
                .signWith(key)
                .compact();
    }

    private SecretKey getJwtSecretKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }
}
