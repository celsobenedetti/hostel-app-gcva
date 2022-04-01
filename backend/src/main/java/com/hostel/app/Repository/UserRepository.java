package com.hostel.app.Repository;

import com.hostel.app.Entity.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

public class UserRepository implements Repository<User>{
    @PersistenceContext
    private EntityManager em;

    public User findByUsername(String username) {
        return em.createQuery("SELECT u FROM User u WHERE u.username = ?1", User.class)
                .setParameter(1, username)
                .getSingleResult();
    }

    @Override
    public User findById(Long id) {
        return null;
    }

    @Override
    public List<User> findAll() {
        return em.createQuery("SELECT u FROM User u", User.class).getResultList();
    }

    @Override
    @Transactional
    public void save(User user) {
        em.persist(user);
    }

    @Override
    public void remove(Long id) {

    }

    @Transactional
    public void remove(String username) {
        User user = this.findByUsername(username);
        em.remove(user);
    }

}
