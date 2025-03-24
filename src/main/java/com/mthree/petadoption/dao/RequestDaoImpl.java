package com.mthree.petadoption.dao;

import com.mthree.petadoption.model.Request;
import com.mthree.petadoption.repository.PetRepository;
import com.mthree.petadoption.repository.RequestRepository;

import java.util.List;

public class RequestDaoImpl implements RequestDao{
    private RequestRepository requestRepository;

    public RequestDaoImpl(PetRepository petRepository) {
        this.requestRepository = requestRepository;
    }

    @Override
    public List<Request> listAllRequests() {
        return requestRepository.findAll();
    }

    @Override
    public Request viewRequest(long requestId) {
        return null;
    }

    @Override
    public Request submitRequest(Request request) {
        return requestRepository.save(request);
    }

    @Override
    public void updateRequest(Request request) {

    }

    @Override
    public void cancelRequest(long requestId) {
        requestRepository.deleteById(requestId);
    }
}
