package com.example.helpdesk.business.user.control;

import com.example.helpdesk.business.user.model.AuthResponse;
import com.example.helpdesk.business.user.model.LoginUserRequest;
import com.example.helpdesk.business.user.model.RegisterUserRequest;
import com.example.helpdesk.business.user.model.User;

public interface UserOperation {

    User getCurrentUserData();

    void registerUser(RegisterUserRequest registerUserRequest);

    AuthResponse loginUser(LoginUserRequest loginUserRequest);

    AuthResponse refreshToken(String jwt);

    void logoutUser(String jwt);
}
