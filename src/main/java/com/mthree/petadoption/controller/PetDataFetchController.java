package com.mthree.petadoption.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mthree.petadoption.service.PetDataFetchService;

@RestController
@RequestMapping("/api/data")
public class PetDataFetchController {
  private final PetDataFetchService petDataFetchService;

  public PetDataFetchController(PetDataFetchService petDataFetchService) {
    this.petDataFetchService = petDataFetchService;
  }

  @PostMapping("/fetch")
  public ResponseEntity<String> fetchAndStorePets(@RequestParam("token") String token, @RequestParam("zipcode") String zipcode) {
    String response = petDataFetchService.fetchAndStorePets(token, zipcode);
    return ResponseEntity.ok(response);
  }
}
