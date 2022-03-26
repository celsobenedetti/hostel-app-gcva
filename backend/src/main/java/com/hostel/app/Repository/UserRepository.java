package com.hostel.app.Repository;

import com.hostel.app.Entity.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class UserRepository implements Repository<User>{
    @PersistenceContext
    private EntityManager em;

    @Override
    public User findById(Long id) {
        return null;
    }

    @Override
    public List<User> findAll() {
        return null;
    }

    @Override
    public void save(User object) {

    }

    @Override
    public void remove(Long id) {

    }
}
