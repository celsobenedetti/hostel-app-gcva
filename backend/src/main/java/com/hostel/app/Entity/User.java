package com.hostel.app.Entity;

import com.hostel.app.Enum.RoleEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User implements Serializable {
    @Id
    @Column(name = "username", length = 30)
    private String username;

    @Column(name = "password", length = 20)
    private String password;

    @Column(name = "role")
    @Enumerated(EnumType.ORDINAL)
    private RoleEnum role = RoleEnum.RECEPCIONIST; //A atribuição define um valor default
}
