package com.hostel.app.Validation;

import com.hostel.app.Entity.User;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordCheck implements ConstraintValidator<ValidUser, User> {
    @Override
    public void initialize(ValidUser constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(User user, ConstraintValidatorContext constraintValidatorContext) {
       return user.getPassword().length() >= 8;
    }
}
