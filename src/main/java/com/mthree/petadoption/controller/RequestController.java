package com.mthree.petadoption.controller;

import com.mthree.petadoption.dto.RequestUpdateStatusDTO;
import com.mthree.petadoption.model.Request;
import com.mthree.petadoption.service.RequestService;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RequestController {
    private final RequestService requestService;

    public RequestController(RequestService requestService){
        this.requestService = requestService;
    }

    @GetMapping("/api/requests")
    public ResponseEntity<List<Request>> getAllRequests(){
        List<Request> requestList = requestService.listAllRequests();
        return ResponseEntity.status(HttpStatus.OK).body(requestList);
    }

    @GetMapping("/api/request/{id}")
    public ResponseEntity<Request> getRequestById(@PathVariable("id") Long id){
        Request request = requestService.viewRequest(id);
        return ResponseEntity.status(HttpStatus.OK).body(request);
    }

    @GetMapping("/api/requests/userid/{id}")
    public ResponseEntity<List<Request>> getAllRequestsByUserId(@PathVariable("id") Long id){
        List<Request> requestList = requestService.getAllRequestsByUserId(id);
        return ResponseEntity.status(HttpStatus.OK).body(requestList);
    }

    @PostMapping ("/api/request")
    public ResponseEntity<Void> addRequest(@RequestBody Map<String, Object> request){
        requestService.submitRequest(request);
        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }

    @PutMapping("/api/request/{id}")
    public ResponseEntity<Void> updateRequest(@PathVariable("id") Long id,  @RequestBody RequestUpdateStatusDTO requestUpdateStatusDTO){
        requestService.updateRequestStatus(id, requestUpdateStatusDTO.getStatus());
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @DeleteMapping("/api/request/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable("id") Long id){
        requestService.cancelRequest(id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

}