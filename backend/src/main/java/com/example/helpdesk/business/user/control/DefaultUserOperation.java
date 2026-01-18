package com.example.helpdesk.business.user.control;

import com.example.helpdesk.business.user.model.*;
import com.example.helpdesk.system.security.boundary.Authenticator;
import com.example.helpdesk.system.security.control.JwtUtils;
import com.example.helpdesk.system.utils.DateTimeProvider;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Collection;

@RequiredArgsConstructor(access = AccessLevel.PACKAGE)
public class DefaultUserOperation implements UserOperation {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserMapper userMapper;
    private final Authenticator authenticator;
    private final JwtUtils jwtUtils;

    @Override
    @Transactional
    public void registerUser(RegisterUserRequest registerUserRequest) {
        validateUserDoesntExist(registerUserRequest.email());
        UserEntity user = userMapper.mapRegisterUserRequestToUser(registerUserRequest);
        userRepository.save(user);
    }

    @Override
    @Transactional
    public AuthResponse loginUser(LoginUserRequest loginUserRequest) {
        UserEntity user = authenticator.authenticateUser(loginUserRequest);
        Token newRefreshToken = jwtUtils.createRefreshToken(user);
        saveNewRefreshToken(user, newRefreshToken);
        return getAuthResource(user, newRefreshToken);
    }

    @Transactional(readOnly = true)
    public Collection<User> getUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::mapUserToUserResource)
                .toList();

    }

    @Override
    @Transactional(readOnly = true)
    public User getCurrentUserData() {
        UserEntity user = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userMapper.mapUserToUserResource(user);
    }

    @Override
    @Transactional
    public AuthResponse refreshToken(String jwt) {
        RefreshTokenEntity oldRefreshToken = refreshTokenRepository.findByJwt(jwt).orElseThrow();
        validateRefreshTokenIsNotExpired(oldRefreshToken);
        UserEntity user = oldRefreshToken.getUser();
        Token newRefreshToken = jwtUtils.createRefreshToken(user);
        updateRefreshToken(oldRefreshToken, newRefreshToken);
        return getAuthResource(user, newRefreshToken);
    }

    @Override
    @Transactional
    public void logoutUser(String jwt) {
        RefreshTokenEntity refreshToken = refreshTokenRepository.findByJwt(jwt).orElseThrow();
        refreshTokenRepository.delete(refreshToken);
    }

    private AuthResponse getAuthResource(UserEntity user, Token refreshToken) {
        return AuthResponse.builder()
                .accessToken(new AccessToken(jwtUtils.createAccessToken(user).getJwt()))
                .refreshToken(new RefreshToken(refreshToken.getJwt(), refreshToken.getExpirationInMs()))
                .build();
    }

    private void saveNewRefreshToken(UserEntity user, Token newToken) {
        Instant newExpiryDate = DateTimeProvider.INSTANCE.now().plusMillis(newToken.getExpirationInMs());
        refreshTokenRepository.findByUser(user).ifPresentOrElse(refreshToken -> updateRefreshToken(refreshToken, newToken),
                () -> refreshTokenRepository.save(RefreshTokenEntity.builder()
                        .jwt(newToken.getJwt())
                        .expiryDate(newExpiryDate)
                        .user(user)
                        .build())
        );
    }

    private void updateRefreshToken(RefreshTokenEntity refreshToken, Token newToken) {
        refreshToken.setJwt(newToken.getJwt());
        refreshToken.setExpiryDate(DateTimeProvider.INSTANCE.now().plusMillis(newToken.getExpirationInMs()));
    }

    private void validateUserDoesntExist(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            throw new IllegalStateException("User with email: " + email + " already exists");
        });
    }

    private void validateRefreshTokenIsNotExpired(RefreshTokenEntity refreshToken) {
        if (refreshToken.isExpired()) {
            refreshTokenRepository.delete(refreshToken);
            throw new IllegalStateException("Refresh token has expired");
        }
    }
}


