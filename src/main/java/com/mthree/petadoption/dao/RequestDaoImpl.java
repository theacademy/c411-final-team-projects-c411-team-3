package com.mthree.petadoption.dao;

import com.mthree.petadoption.model.Request;

import java.util.List;

public class RequestDaoImpl implements RequestDao{
    @Override
    public List<Request> listAllRequests() {
        return List.of();
    }

    @Override
    public Request viewRequest(long requestId) {
        return null;
    }

    @Override
    public Request submitRequest(Request request) {
        return null;
    }

    @Override
    public void updateRequest(Request request) {

    }

    @Override
    public void cancelRequest(long requestId) {

    }
}
