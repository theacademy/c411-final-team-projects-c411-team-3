package com.mthree.petadoption.service;

import com.mthree.petadoption.model.Request;

import java.util.List;

public interface RequestService {

    List<Request> listAllRequests();

    Request viewRequest(long requestId);

    Request submitRequest(Request request);

    void updateRequest(Long requestId, Long petId, String status);

    void cancelRequest(long requestId);
}
