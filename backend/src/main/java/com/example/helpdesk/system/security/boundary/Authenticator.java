package com.example.helpdesk.system.security.boundary;

import com.example.helpdesk.business.user.model.LoginUserRequest;
import com.example.helpdesk.business.user.model.UserEntity;

public interface Authenticator {

    UserEntity authenticateUser(LoginUserRequest loginUserRequest);

}
