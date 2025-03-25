package com.mthree.petadoption.service;

import com.mthree.petadoption.model.Request;

import java.util.List;
import java.util.Map;

public interface RequestService {

    List<Request> listAllRequests();

    Request viewRequest(long requestId);

    Request submitRequest(Map<String, Object> requestData);

    void updateRequest(Long requestId, Long petId, String status);

    void cancelRequest(long requestId);
}
