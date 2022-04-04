package com.hostel.app.Entity;

import com.hostel.app.Validation.ValidGuest;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "GUEST")
@ValidGuest
public class Guest implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GUEST_ID")
    private Long id;
    @Column(name = "FIRST_NAME")
    private String firstName;
    @Column(name = "LAST_NAME")
    private String lastName;
    @Column(name = "EMAIL_ADDRESS")
    private String email;
    @Column(name = "PHONE_NUMBER")
    private String phone;
    @Column(name = "ADDRESS")
    private String address;
    @Column(name = "COUNTRY")
    private String country;
    @Column(name = "STATE")
    private String state;
    @Column(name = "STATUS")
    private boolean status = true;

    public Guest(String firstName, String lastName, String EMAIL_ADDRESS, String PHONE_NUMBER, String ADDRESS, String COUNTRY, String STATE, boolean status) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = EMAIL_ADDRESS;
        this.phone = PHONE_NUMBER;
        this.address = ADDRESS;
        this.country = COUNTRY;
        this.state = STATE;
        this.status = status;
    }
}
