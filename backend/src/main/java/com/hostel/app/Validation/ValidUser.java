package com.hostel.app.Validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE_USE})
@Documented
@Constraint(validatedBy = {PasswordCheck.class})
public @interface ValidUser {
    String message() default "Password deve conter mais de 8 caracteres!";
    Class<?>[] groups() default { };
    Class<? extends Payload>[] payload() default { };
}
