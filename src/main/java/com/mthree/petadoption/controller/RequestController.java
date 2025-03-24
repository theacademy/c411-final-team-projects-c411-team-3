package com.mthree.petadoption.controller;

import com.mthree.petadoption.model.Request;
import com.mthree.petadoption.service.RequestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RequestController {
    private final RequestService requestService;

    public RequestController(RequestService requestService){
        this.requestService = requestService;
    }

    @GetMapping("/api/requests")
    public List<Request> getAllRequests(){
        return requestService.listAllRequests();
    }

    @GetMapping("/api/requests/{id}")
    public Request getRequestById(@PathVariable("id") Long id){return requestService.viewRequest(id);}

    @PostMapping ("/api/requests")
    public Request addRequest(Request request){ return requestService.submitRequest(request);}

    @PutMapping("/api/update")
    public void updateRequest(Long requestId, Long petId, String status){requestService.updateRequest(requestId, petId, status);}

    @DeleteMapping("/api/{id}")
    public void deleteRequest(@PathVariable("id") Long id){ requestService.cancelRequest(id);}

}
