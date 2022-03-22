package com.hostel.app.Controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("/example")             //localhost:/8080/{appName}/resources/example
@Produces("application/json")
public class Example {

    @GET                        // GET localhost:/8080/{appName}/resources/example/hello
    @Path("/hello")
    public String getTeste(){
        return "Hello World!";
    }
}
