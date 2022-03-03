package entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Guest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String FIRST_NAME;
    private String LAST_NAME;
    private String EMAIL_ADDRESS;
    private String PHONE_NUMBER;
    private String ADDRESS;
    private String COUNTRY;
    private String STATE;

    public Guest(String FIRST_NAME, String LAST_NAME, String EMAIL_ADDRESS, String PHONE_NUMBER, String ADDRESS, String COUNTRY, String STATE) {
        this.FIRST_NAME = FIRST_NAME;
        this.LAST_NAME = LAST_NAME;
        this.EMAIL_ADDRESS = EMAIL_ADDRESS;
        this.PHONE_NUMBER = PHONE_NUMBER;
        this.ADDRESS = ADDRESS;
        this.COUNTRY = COUNTRY;
        this.STATE = STATE;
    }
}
