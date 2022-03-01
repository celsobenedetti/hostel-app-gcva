package controller;

import entity.Guest;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.List;

@Path("guests")
@Produces("application/xml")
public class GuestController {

    //Isso eh apenas para teste - Provavelmente esses managers serao colocados em outra layer (Repository ou Service), que será instanciada nessa classe
    private final EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("default");
    private final EntityManager entityManager = entityManagerFactory.createEntityManager();

    @GET
    public String getGuests(){
        Query queryGuests = entityManager.createNativeQuery("Select * from GUEST", Guest.class);
        List<Guest> guests = queryGuests.getResultList();

        StringBuilder retorno = new StringBuilder();
        for (Guest guest : guests) {
            retorno.append(guest.getFIRST_NAME()).append("\n");
        }
        return retorno.toString();
    }
}
