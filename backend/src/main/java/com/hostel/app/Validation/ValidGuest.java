package com.hostel.app.Validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE_USE})
@Documented
@Constraint(validatedBy = {ValidGuestCheck.class})
public @interface ValidGuest {
    String message() default "As informações do Guest não são válidas";

    Class<?>[] groups() default { };
    Class<? extends Payload>[] payload() default { };
}
