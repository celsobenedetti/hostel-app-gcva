package com.hostel.app.Controller.Utils;


import java.util.List;

public interface Pageable<T> {
    public Page<T> getPage(List<T> list);
}
