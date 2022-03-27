package com.hostel.app.Repository;

import com.hostel.app.Entity.Guest;
import lombok.Getter;
import lombok.Setter;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Getter
@Setter
@ApplicationScoped
public class GuestRepository implements Repository<Guest> {
    @PersistenceContext
    private EntityManager em;


    public Guest findById(Long id) {
        return em.find(Guest.class, id);
    }

    public List<Guest> findAll() {
        return em.createQuery("SELECT g FROM Guest g ORDER BY g.id", Guest.class).getResultList();
    }

    @Transactional
    public void save(Guest guest) {
        em.persist(guest);
    }

    @Transactional
    public void remove(Long id) {
        Guest guest = this.findById(id);
        em.remove(guest);
    }


    public List<Guest> findAllWithLimit(int baseNumber, int numberElements) {
        List<Guest> result = em.createNativeQuery("SELECT * FROM GUEST LIMIT " + baseNumber + "," + numberElements, Guest.class).getResultList();
        return result;
    }

    public List<Guest> findByFirstnameOrLastNameWithLimit(String searchString, int baseNumber, int numberElements) {
        searchString = '%' + searchString + '%';//searchString
        List result = em.createNativeQuery("SELECT * FROM GUEST WHERE FIRST_NAME LIKE ?1 OR LAST_NAME LIKE ?1 LIMIT " + baseNumber + "," + numberElements, Guest.class)
                .setParameter(1, searchString)
                .getResultList();
        return result;
    }

    public List<Guest> findByFirstnameOrLastName(String searchString) {
        searchString = '%' + searchString + '%';//searchString
        List result = em.createNativeQuery("SELECT * FROM GUEST WHERE FIRST_NAME LIKE ?1 OR LAST_NAME LIKE ?1", Guest.class)
                .setParameter(1, searchString)
                .getResultList();
        return result;
    }

    @Transactional
    public void updateStatus(Long id, boolean status){
        Guest guest = this.findById(id);
        guest.setStatus(status);
    }

}
