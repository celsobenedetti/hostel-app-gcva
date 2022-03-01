package controller;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("/teste")
@Produces("application/xml")
public class TesteController {

    @GET
    @Path("/teste")
    public String getTeste(){
        return "Hello World!";
    }
}
