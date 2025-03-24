package com.mthree.petadoption.dao;

import com.mthree.petadoption.model.Pet;
import com.mthree.petadoption.model.Request;

import java.util.List;

public interface RequestDao {
    List<Request> listAllRequests();

    Request viewRequest(long requestId);

    Request submitRequest(Request request);

    Request updateRequest(Long requestId, Long petId, String status);

    void cancelRequest(long requestId);
}
