package com.hostel.app.Validation;

import com.hostel.app.Entity.Guest;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ValidGuestCheck implements ConstraintValidator<ValidGuest, Guest> {
    @Override
    public void initialize(ValidGuest constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Guest guest, ConstraintValidatorContext constraintValidatorContext) {
        //validade email
        String regex = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(guest.getEmail());
        boolean emailValidate = matcher.matches();

        //validate phone number US format
        regex = "^(?:(?:\\+?1\\s*(?:[.-]\\s*)?)?(?:\\(\\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\\s*\\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\\s*(?:[.-]\\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\\s*(?:[.-]\\s*)?([0-9]{4})(?:\\s*(?:#|x\\.?|ext\\.?|extension)\\s*(\\d+))?$";
        pattern = Pattern.compile(regex);
        matcher = pattern.matcher(guest.getPhone());
        boolean phoneValidade = matcher.matches();

        return emailValidate && phoneValidade;

    }
}
