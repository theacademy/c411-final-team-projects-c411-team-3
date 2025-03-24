package com.mthree.petadoption.service;

import com.mthree.petadoption.dao.RequestDao;
import com.mthree.petadoption.dao.RequestDaoImpl;
import com.mthree.petadoption.model.Request;

import java.util.List;

public class RequestServiceImpl implements RequestService {
    private RequestDao requestDao;

    public RequestServiceImpl(RequestDaoImpl requestDao) {
        this.requestDao = requestDao;
    }

    @Override
    public List<Request> listAllRequests() {
        return requestDao.listAllRequests();
    }

    @Override
    public Request viewRequest(long requestId) {
        return null;
    }

    @Override
    public Request submitRequest(Request request) {
        return requestDao.submitRequest(request);
    }

    @Override
    public void updateRequest(Request request) {

    }

    @Override
    public void cancelRequest(long requestId) {
        requestDao.cancelRequest(requestId);
    }
}
