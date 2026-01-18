package com.example.helpdesk.business.user.boundary;

import com.example.helpdesk.business.user.control.UserOperation;
import com.example.helpdesk.business.user.model.AccessToken;
import com.example.helpdesk.business.user.model.AuthResponse;
import com.example.helpdesk.business.user.model.RefreshToken;
import com.example.helpdesk.business.user.model.LoginUserRequest;
import com.example.helpdesk.business.user.model.RegisterUserRequest;
import com.example.helpdesk.business.user.model.User;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
public class UserResource {

    private static final String ENDPOINTS_USING_REFRESH_TOKEN = "/users/token/";
    private final UserOperation userOperation;

    @GetMapping("/current")
    ResponseEntity<User> getCurrentUserData() {
        return ResponseEntity.ok(userOperation.getCurrentUserData());
    }

    @PostMapping("/register")
    ResponseEntity<Void> registerUser(@RequestBody @Valid RegisterUserRequest registerUserRequest) {
        userOperation.registerUser(registerUserRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    ResponseEntity<AccessToken> loginUser(@RequestBody @Valid LoginUserRequest loginUserRequest) {
        AuthResponse authResource = userOperation.loginUser(loginUserRequest);
        return getResponseWithTokens(authResource);
    }

    @PostMapping("/token/refreshToken")
    ResponseEntity<AccessToken> refreshToken(@Parameter(hidden = true) @CookieValue(name = "refreshToken") String jwt) {
        AuthResponse authResource;
        try {
            authResource = userOperation.refreshToken(jwt);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).header(HttpHeaders.SET_COOKIE, getDeleteRefreshTokenCookie(jwt).toString()).build();
        }
        return getResponseWithTokens(authResource);
    }

    @PostMapping("/token/logout")
    ResponseEntity<Void> logoutUser(@Parameter(hidden = true) @CookieValue(name = "refreshToken") String jwt) {
        userOperation.logoutUser(jwt);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, getDeleteRefreshTokenCookie(jwt).toString()).build();
    }

    private ResponseCookie getRefreshTokenCookie(RefreshToken refreshToken) {
        return ResponseCookie.from("refreshToken", refreshToken.jwt())
                .httpOnly(true)
                .path(ENDPOINTS_USING_REFRESH_TOKEN)
                .maxAge(TimeUnit.MILLISECONDS.toSeconds(refreshToken.expirationInMs()))
                .build();
    }

    private ResponseCookie getDeleteRefreshTokenCookie(String jwt) {
        return ResponseCookie.from("refreshToken", jwt)
                .httpOnly(true)
                .path(ENDPOINTS_USING_REFRESH_TOKEN)
                .maxAge(0)
                .build();
    }

    private ResponseEntity<AccessToken> getResponseWithTokens(AuthResponse tokenResource) {
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, getRefreshTokenCookie(tokenResource.refreshToken()).toString()).body(tokenResource.accessToken());
    }

}



