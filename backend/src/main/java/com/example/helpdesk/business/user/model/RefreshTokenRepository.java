package com.example.helpdesk.business.user.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshTokenEntity, Long> {

    Optional<RefreshTokenEntity> findByJwt(String jwt);

    Optional<RefreshTokenEntity> findByUser(UserEntity user);
}
