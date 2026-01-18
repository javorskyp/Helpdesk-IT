package com.example.helpdesk.business.user.control;

import com.example.helpdesk.business.user.model.RegisterUserRequest;
import com.example.helpdesk.business.user.model.User;
import com.example.helpdesk.business.user.model.UserEntity;
import com.example.helpdesk.system.security.control.SecurePasswordManager;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;

@RequiredArgsConstructor
public class UserMapper {

    private final SecurePasswordManager securePasswordManager;

    public UserEntity mapRegisterUserRequestToUser(@NonNull RegisterUserRequest registerUserRequest) {
        return UserEntity.builder()
                .email(registerUserRequest.email())
                .password(securePasswordManager.encodePassword(registerUserRequest.password()))
                .firstName(registerUserRequest.firstName())
                .lastName(registerUserRequest.lastName())
                .build();
    }

    public User mapUserToUserResource(@NonNull UserEntity user) {
        return User.builder()
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();
    }

}
