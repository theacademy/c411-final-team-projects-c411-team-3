package com.mthree.petadoption.service;

import com.mthree.petadoption.dao.RequestDao;
import com.mthree.petadoption.dao.RequestDaoImpl;
import com.mthree.petadoption.model.Request;

import java.util.List;

import com.mthree.petadoption.model.User;
import org.springframework.stereotype.Service;

@Service
public class RequestServiceImpl implements RequestService {
    private final RequestDao requestDao;

    public RequestServiceImpl(RequestDaoImpl requestDao) {
        this.requestDao = requestDao;
    }

    @Override
    public List<Request> listAllRequests() {
        return requestDao.listAllRequests();
    }

    @Override
    public Request viewRequest(long requestId) {
        return requestDao.viewRequest(requestId);
    }

    @Override
    public Request submitRequest(Request request) {
        return requestDao.submitRequest(request);
    }

    @Override
    public void updateRequest(Long requestId, Long petId, String status) {
        requestDao.updateRequest(requestId, petId, status);
    }

    @Override
    public void cancelRequest(long requestId) {
        requestDao.cancelRequest(requestId);
    }
}
