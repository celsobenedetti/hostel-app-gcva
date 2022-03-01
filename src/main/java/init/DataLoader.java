package init;

import entity.Guest;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import java.util.Arrays;
import java.util.List;

public class DataLoader{

    private final EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("default");
    private final EntityManager entityManager = entityManagerFactory.createEntityManager();

    private final Guest[] guests = {
            new Guest("Jay", "Gatsby", "jay@gmail.com", "+1-205-555-0178", " 1187 Fleming Street", "United States", "AL" ),
            new Guest("Holden", "Caulfield", "holden@mit.edu", "+1-303-555-0137", " 3998 Davis Lane", "United States", "CO" ),
            new Guest("Humbert", "Humbert", "humbert@gmail.com", "+1-303-555-0156", " 499 McKinley Avenue", "United States", "CO" ),
            new Guest("Leopold", "Bloom", "bloom@blogs.com", "+1-561-555-0145", " 4239 Marigold Lane", "United States", "FL" ),
            new Guest("Rabbit", "Angstrom", "angstrom@hotmail.com", "+1-561-555-0135", " 4306 Jacobs Street", "United States", "FL" ),
            new Guest("Sherlock", "Holmes", "holmes@aol.com", "+1-907-555-0187", "1395 DolaMine Road", "United States", "AK" ),
            new Guest("Atticus", "Finch", "finch@hotmail.com", "+1-480-555-0198", " 3566 Parkway Drive", "United States", "AZ" ),
            new Guest("Molly", "Bloom", "molly@microsoft.com", "+1-501-555-0120", " 4206 Mulberry Avenue", "United States", "AR" ),
            new Guest("Stephen", "Dedalus", "dedalus@apple.com", "+1-510-555-0183", "359 HideA Way Road" , "United States", "CA"),
            new Guest("Lily", "Bart", "bart@gmail.com", "+1-860-555-0154", " 639 Airplane Avenue", "United States", "CT" ),
            new Guest("Holly", "Golightly", "golightly@gmail.com", "+1-847-555-0127", " 3786 Scenic Way", "United States", "IL" ),
            new Guest("Gregor", "Samsa", "samsa@yahoo.com", "+1-808-555-0162", "1833 DonJackson Lane", "United States", "HI" ),
            new Guest("Aureliano", "Buendia", "buendia@yahoo.com", "+1-847-555-0151", " 2195 Eagle Street", "United States", "IL" ),
            new Guest("Ignatius", "Reilly", "reilly@gmail.com", "+1-920-555-0109", " 1632 Pearlman Avenue", "United States", "WI" ),
            new Guest("George", "Smiley", "smiley@gmail.com", "+1-785-555-0132", " 2436 Williams Lane", "United States", "KS" ),
            new Guest("Winnie", "Pooh", "pooh@yahoo.com", "+1-860-555-0146", " 3529 Cheshire Road", "United States", "CT" ),
            new Guest("Bigger", "Thomas", "thomas@hotmail.com", "+1-510-555-0112", " 3091 Doctors Drive", "United States", "CA" ),
            new Guest("Nick", "Adams", "adams@gmail.com", "+1-605-555-0121", " 3199 Ryan Road", "United States", "SD" ),
            new Guest("Scarlett", "OHara", "ohara@gmail.com", "+1-510-555-0187", " 3502 Station Street", "United States", "CA" ),
            new Guest("Scout", "Finch", "finch@gmail.com", "+1-501-555-0132", " 2552 Cedar Street", "United States", "AR" ),
            new Guest("Philip", "Marlowe", "marlowe@hotmail.com", "+1-480-555-0147", " 2810 Polk Street", "United States", "AZ" )
    };

    public  void loadDataInDatabase(){
        entityManager.getTransaction().begin();
        loadGuests();
        entityManager.getTransaction().commit();

        entityManager.close();
        entityManagerFactory.close();
    }

    public void loadGuests(){
        Arrays.stream(guests).forEach(entityManager::persist);
    }
}