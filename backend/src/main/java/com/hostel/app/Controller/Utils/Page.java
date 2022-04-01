package com.hostel.app.Controller.Utils;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter

public class Page<T> implements Serializable {
    private List<T> result;
    private int totalSize;

    public Page(List<T> result, int pageNumbers) {
        this.result = result;
        this.totalSize = pageNumbers;
    }
}
