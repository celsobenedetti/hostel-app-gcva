package com.hostel.app.Controller;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

//Controlador User
@Path("user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserController {
    @GET
    @Path("/{id}")
    public String getUser(@PathParam("id") Long id){
        // TODO: implmentar endpoit que retorna usuários por id
        return "Usuário " + id;
    }
}
