package com.mthree.petadoption.dao;

import com.mthree.petadoption.model.Pet;
import com.mthree.petadoption.model.Request;
import com.mthree.petadoption.model.User;

import java.util.List;

public class RequestDaoStubImpl implements RequestDao{

    public Request onlyRequest;

    public RequestDaoStubImpl() {
        //create a new pet and user as a sample
        Pet pet = new Pet();
        pet.setPetId(1L);

        User user = new User();
        user.setUserId(1L);

        onlyRequest = new Request();
        onlyRequest.setRequestId(121L);
        onlyRequest.setPet(pet);
        onlyRequest.setUser(user);
    }

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
    public Request updateRequest(Long requestId, Long petId, String status) {
        return null;
    }

    @Override
    public void cancelRequest(long requestId) {

    }
}
