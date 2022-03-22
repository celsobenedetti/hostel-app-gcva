package com.hostel.app.Repository;

import com.hostel.app.Entity.Guest;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class GuestRepository {
    @PersistenceContext
    private EntityManager em;

    public Guest findById(Long id){
        return em.find(Guest.class, id);
    }

    public List<Guest> findAll() {
        return em.createQuery("SELECT g FROM Guest g ORDER BY g.id", Guest.class).getResultList();
    }

    @Transactional
    public void save(Guest guest){
        em.persist(guest);
    }
}
