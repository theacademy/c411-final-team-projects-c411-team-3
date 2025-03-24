package com.mthree.petadoption.dao;

import com.mthree.petadoption.model.Pet;
import com.mthree.petadoption.model.Request;

import java.util.List;

public interface RequestDao {
    List<Request> listAllRequests();

    Request viewRequest(long requestId);

    Request submitRequest(Request request);

    void updateRequest(Request request);

    void cancelRequest(long requestId);
}
