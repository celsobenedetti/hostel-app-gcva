package com.hostel.app.Repository;


import java.util.List;

public interface Pageable<T> {
    public Page<T> getPage(int pageNumber, int pageSize);
}
