package com.hostel.app.Repository;

import com.hostel.app.Entity.Guest;

import java.util.List;

public interface Repository<T> {
    T findById(Long id);
    List<T> findAll();
    void save(T object);
    void remove(Long id);
}
