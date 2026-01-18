package com.example.helpdesk.business.user.control;

import com.example.helpdesk.business.user.model.Role;
import com.example.helpdesk.business.user.model.UserEntity;
import com.example.helpdesk.business.user.model.UserRepository;
import com.example.helpdesk.system.security.control.SecurePasswordManager;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
class AdminUserInitializer implements ApplicationRunner {

    private static final Logger logger = LoggerFactory.getLogger(AdminUserInitializer.class);

    private final UserRepository userRepository;
    private final SecurePasswordManager securePasswordManager;
    private final AdminUserProperties adminUserProperties;

    @Override
    public void run(ApplicationArguments args) {
        String email = adminUserProperties.getEmail();
        String password = adminUserProperties.getPassword();
        if (email == null || email.isBlank() || password == null || password.isBlank()) {
            logger.info("Admin user initialization skipped: missing email or password.");
            return;
        }
        boolean adminExists = userRepository.findByEmail(email).isPresent();
        if (adminExists) {
            logger.info("Admin user already exists for email={}.", email);
            return;
        }
        userRepository.save(UserEntity.builder()
                .email(email)
                .password(securePasswordManager.encodePassword(password))
                .role(Role.ADMIN)
                .build());
        logger.info("Admin user created for email={}.", email);
    }
}
