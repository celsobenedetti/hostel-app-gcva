package com.hostel.app.Service;


import java.util.List;

public interface Pageable<T> {
    public Page<T> getPage(List<T> list);
}
