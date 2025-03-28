package com.mthree.petadoption.service;

import com.mthree.petadoption.dao.RequestDao;
import com.mthree.petadoption.dao.RequestDaoImpl;
import com.mthree.petadoption.model.Pet;
import com.mthree.petadoption.model.Request;

import java.time.LocalDate;
import java.util.List;

import com.mthree.petadoption.model.User;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class RequestServiceImpl implements RequestService {
    private final RequestDao requestDao;
    private final UserService userService;
    private final PetService petService;

    public RequestServiceImpl(RequestDaoImpl requestDao, UserService userService,
        PetService petService) {
        this.requestDao = requestDao;
        this.userService = userService;
        this.petService = petService;
    }

    @Override
    public List<Request> listAllRequests() {
        return requestDao.listAllRequests();
    }

    @Override
    public List<Request> getAllRequestsByUserId(Long id) {
        return requestDao.getAllRequestsByUserId(id);
    }

    @Override
    public Request viewRequest(long requestId) {
        return requestDao.viewRequest(requestId);
    }

    @Override
    public Request submitRequest(Map<String, Object> requestData) {
        Long userId = Long.parseLong(requestData.get("userId").toString());
        Long petId = Long.parseLong(requestData.get("petId").toString());
        String message = (String) requestData.get("message");
        LocalDate requestDate = LocalDate.parse((String) requestData.get("requestDate"));

        User user = userService.getUserById(userId)
            .orElseThrow(() -> new RuntimeException("Invalid User ID - request rejected"));

        Pet pet = petService.getPetById(petId)
            .orElseThrow(() -> new RuntimeException("Invalid Pet ID - request rejected"));

        Request request = new Request();
        request.setUser(user);
        request.setPet(pet);
        request.setMessage(message);
        request.setRequestDate(requestDate);
        request.setStatus(Request.Status.PENDING);
        validateRequest(request);

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

    private void validateRequest(Request request) {
        if (request.getMessage() == null || request.getMessage().trim().isEmpty()) {
            throw new IllegalArgumentException("Message is required.");
        }
    }

    @Override
    public void updateRequestStatus(Long requestId, String status) {
        requestDao.updateRequestStatus(requestId, status);
    }

}