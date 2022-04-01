package com.hostel.app.Controller;

import com.hostel.app.Entity.Guest;
import com.hostel.app.Entity.User;
import com.hostel.app.Enum.RoleEnum;
import com.hostel.app.Repository.UserRepository;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

//Controlador User
@Path("user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserController {
    @Inject
    UserRepository userRepository;

    @GET
    @Path("/{id}")
    public User getUserByUsername(@PathParam("id") String username){
        return userRepository.findByUsername(username);
    }

    @POST
    public Response createNewUser(User newUser){
        try {
            userRepository.save(newUser);
            return Response.status(200, "Inserido!").build();
        } catch (Exception e) {
            return Response.status(400, e.getMessage()).build();
        }
    }
//    @POST
//    public String createNewUser(User newUser){
//        try {
//            //userRepository.save(newUser);
//            return newUser.getUsername();
//        } catch (Exception e) {
//            return e.getMessage();
//        }
//    }


    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") long id) {
        userRepository.remove(id);
        return Response.status(200).build();
    }

    @GET
    @Path("/all")
    public List<User> getAll () {
        return userRepository.findAll();
    }

}
