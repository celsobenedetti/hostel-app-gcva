package com.hostel.app.Security;

import com.hostel.app.Entity.User;
import com.hostel.app.Repository.GuestRepository;
import com.hostel.app.Repository.UserRepository;

import javax.inject.Inject;
import javax.security.enterprise.credential.Credential;
import javax.security.enterprise.credential.UsernamePasswordCredential;
import javax.security.enterprise.identitystore.CredentialValidationResult;
import javax.security.enterprise.identitystore.IdentityStore;
import java.util.Collections;
import java.util.HashSet;

import static java.util.Arrays.asList;
import static javax.security.enterprise.identitystore.CredentialValidationResult.INVALID_RESULT;

public class DatabaseIdentifyStore implements IdentityStore {
    @Inject
    private UserRepository userRepository;

    @Override
    public CredentialValidationResult validate(Credential credential) {
        UsernamePasswordCredential usernamePasswordCredential = (UsernamePasswordCredential) credential;
        try {
            User user = userRepository.findByUsername(usernamePasswordCredential.getCaller());

            if (usernamePasswordCredential.compareTo(user.getUsername(), user.getPassword())) {
                switch (user.getRole()){
                    case RECEPCIONIST:
                        return new CredentialValidationResult(usernamePasswordCredential.getCaller(), Collections.singleton("RSP"));
                    case RESERVATION_MANAGER:
                        return new CredentialValidationResult(usernamePasswordCredential.getCaller(), Collections.singleton("RSM"));
                    default:
                        break;
                }
            }
            return INVALID_RESULT;
        } catch (Exception e) {
            return CredentialValidationResult.NOT_VALIDATED_RESULT;
        }
    }

    @Override
    public int priority() {
        return 10;
    }
}
