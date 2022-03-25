package com.hostel.app.Controller;

import com.hostel.app.Entity.Guest;
import com.hostel.app.Repository.GuestRepository;
import com.hostel.app.Service.Page;
import com.hostel.app.Service.Pageable;

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
    @Path("all")
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

    @GET
    public Page<Guest> page(@QueryParam("page") int page, @QueryParam("size") int size) {
        List<Guest> result = guestRepository.findAllWithLimit(size * (page - 1) , size);
        int totalSize = guestRepository.findAll().size();
        return new Page<Guest>(result, totalSize);
    }

    @GET
    @Path("search")
    public Page<Guest> search(@QueryParam("q") String q, @QueryParam("page") int page, @QueryParam("size") int size) {
        List<Guest> result = guestRepository.findByFirstnameOrLastNameWithLimit(q, size * (page - 1) , size);
        int totalSize = guestRepository.findByFirstnameOrLastName(q).size();
        return new Page<Guest>(result, totalSize);
    }
}