package com.example.helpdesk.system.security.control;

import com.example.helpdesk.business.user.model.LoginUserRequest;
import com.example.helpdesk.business.user.model.UserEntity;
import com.example.helpdesk.system.security.boundary.Authenticator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

@RequiredArgsConstructor
public class DefaultAuthenticator implements Authenticator {

    private final AuthenticationManager authenticationManager;
    private final SecurePasswordManager securePasswordManager;

    @Override
    public UserEntity authenticateUser(LoginUserRequest loginUserRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        loginUserRequest.email(), securePasswordManager.getPasswordWithPepper(loginUserRequest.password())));
        return (UserEntity) authentication.getPrincipal();
    }
}
