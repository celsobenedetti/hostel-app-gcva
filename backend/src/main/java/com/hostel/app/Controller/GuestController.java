package com.hostel.app.Controller;

import com.hostel.app.Entity.Guest;
import com.hostel.app.Repository.GuestRepository;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("guests")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class GuestController {

    // O conteúdo dessa classe serve mais como um guia do que deve ser feito
    // Os métodos e dependencias provavelmente serão modificados
    @Inject
    private GuestRepository guestRepository;

    @GET
    public List<Guest> getGuests(){
        return guestRepository.findAll();
    }

    @GET
    @Path("{id}")

    public Guest getGuestById(@PathParam("id") long id) {
        //TODO: pegar Guest no banco de dados atraves do id
        return guestRepository.findById(id);
    }

    @POST
    public Response createNewGuest(Guest newGuest){
        //TODO: inserir novo Guest no banco de dados
        guestRepository.save(newGuest);
        return Response.status(200).build();
    }
}