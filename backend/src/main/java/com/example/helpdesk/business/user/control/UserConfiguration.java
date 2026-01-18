package com.example.helpdesk.business.user.control;

import com.example.helpdesk.business.user.model.RefreshTokenRepository;
import com.example.helpdesk.business.user.model.UserRepository;
import com.example.helpdesk.system.security.boundary.Authenticator;
import com.example.helpdesk.system.security.control.JwtUtils;
import com.example.helpdesk.system.security.control.SecurePasswordManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class UserConfiguration {

    @Bean
    UserOperation userOperation(UserRepository userRepository,
                                RefreshTokenRepository refreshTokenRepository,
                                SecurePasswordManager securePasswordManager,
                                Authenticator authenticator,
                                JwtUtils jwtUtils) {
        return new DefaultUserOperation(
                userRepository,
                refreshTokenRepository,
                new UserMapper(securePasswordManager),
                authenticator,
                jwtUtils
        );
    }
}
