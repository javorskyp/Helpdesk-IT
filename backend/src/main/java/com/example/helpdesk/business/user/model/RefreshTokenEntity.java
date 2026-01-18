package com.example.helpdesk.business.user.model;

import com.example.helpdesk.system.utils.DateTimeProvider;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RefreshTokenEntity {

    @Column(nullable = false, unique = true, length = 1024)
    String jwt;
    @Column(nullable = false)
    Instant expiryDate;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private long id;
    @OneToOne
    private UserEntity user;

    public boolean isExpired() {
        return expiryDate.isBefore(DateTimeProvider.INSTANCE.now());
    }

}
