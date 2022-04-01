package com.hostel.app.Controller;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("hello")
public class TestController {
    @GET
    @RolesAllowed({"RSM"})
    @Path("word")
    public String hello(){
        return "ola";
    }

}
