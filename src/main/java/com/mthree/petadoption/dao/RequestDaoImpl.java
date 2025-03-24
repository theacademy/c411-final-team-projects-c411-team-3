package com.mthree.petadoption.dao;

import com.mthree.petadoption.model.Pet;
import com.mthree.petadoption.model.Request;

import com.mthree.petadoption.repository.PetRepository;
import java.util.List;
import org.springframework.stereotype.Repository;
import com.mthree.petadoption.repository.RequestRepository;

@Repository
public class RequestDaoImpl implements RequestDao{

    private final RequestRepository requestRepository;
    private final PetRepository petRepository;

    public RequestDaoImpl(RequestRepository requestRepository, PetRepository petRepository) {
        this.requestRepository = requestRepository;
        this.petRepository = petRepository;
    }

    @Override
    public List<Request> listAllRequests() {
        return List.of();
    }

    @Override
    public Request viewRequest(long requestId) { //Roosh
        return requestRepository.findById(requestId).orElse(null);
    }

    @Override
    public Request submitRequest(Request request) {
        return null;
    }

    @Override
    public Request updateRequest(Long requestId, Long petId, String status) {
        Request request = requestRepository.findRequestById(requestId);

        if (petId != null) {
            Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new RuntimeException("Pet not found with ID: " + petId));
            request.setPet(pet);
        }

        if (status != null) {
            try {
                request.setStatus(Request.Status.valueOf(status.toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid status value: " + status);
            }
        }
        return requestRepository.save(request);

    }

    @Override
    public void cancelRequest(long requestId) {

    }
}
