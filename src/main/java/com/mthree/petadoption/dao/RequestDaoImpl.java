package com.mthree.petadoption.dao;

import com.mthree.petadoption.model.Pet;
import com.mthree.petadoption.model.Request;

import com.mthree.petadoption.repository.PetRepository;
import java.util.List;

import com.mthree.petadoption.repository.UserRepository;
import org.springframework.stereotype.Repository;
import com.mthree.petadoption.repository.RequestRepository;

@Repository
public class RequestDaoImpl implements RequestDao{

    private final RequestRepository requestRepository;
    private final PetRepository petRepository;
    private final UserRepository userRepository;

    public RequestDaoImpl(RequestRepository requestRepository, PetRepository petRepository, UserRepository userRepository) {
        this.requestRepository = requestRepository;
        this.petRepository = petRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Request> listAllRequests() {
        return requestRepository.findAll();
    }

    @Override
    public List<Request> getAllRequestsByUserId(Long userId) {
        return requestRepository.findAllByUserId(userId);
    }

    @Override
    public Request viewRequest(long requestId) {
        return requestRepository.findById(requestId).orElse(null);
    }

    @Override
    public Request submitRequest(Request request) {
        if(request.getUser() == null && request.getPet() == null){
            throw new RuntimeException("You must provide at least one user and/or pet");
        }
        if(!userRepository.existsById(request.getUser().getId())){
            throw new RuntimeException("Invalid User ID - request rejected");
        } else if(!petRepository.existsById(request.getPet().getPetId())){
            throw new RuntimeException("Invalid Pet ID - request rejected");
        }
        return requestRepository.save(request);
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
        requestRepository.deleteById(requestId);
    }
}