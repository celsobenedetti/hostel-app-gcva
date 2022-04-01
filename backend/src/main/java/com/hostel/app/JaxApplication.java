package com.hostel.app;

import javax.annotation.security.DeclareRoles;
import javax.enterprise.context.ApplicationScoped;
import javax.security.enterprise.authentication.mechanism.http.BasicAuthenticationMechanismDefinition;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;


@ApplicationPath("api")
@BasicAuthenticationMechanismDefinition(realmName = "userRealm")
@ApplicationScoped
@DeclareRoles({"RSP", "RSM"})
public class JaxApplication extends Application {
}
