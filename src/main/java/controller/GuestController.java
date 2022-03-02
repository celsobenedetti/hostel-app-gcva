package controller;

import entity.Guest;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.ws.rs.*;
import java.util.List;

@Path("guests")
@Produces("application/json")
public class GuestController {

    //O conteúdo dessa classe serve mais como um guia do que deve ser feito
    // Os métodos e dependencias provavelmente serão modificados

    private final EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("default");
    private final EntityManager entityManager = entityManagerFactory.createEntityManager();

    @GET
    public List<Guest> getGuests(){
        Query queryGuests = entityManager.createNativeQuery("Select * from GUEST", Guest.class);
        return queryGuests.getResultList();
    }

    @GET
    @Path("{id}")
    public Guest getGuestById(@PathParam("id") long id) {
        //TODO: pegar Guest no banco de dados atraves do id
        return null;
    }

    @POST
    public void createNewGuest(Guest newGuest){
        //TODO: inserir novo Guest no banco de dados
    }
}