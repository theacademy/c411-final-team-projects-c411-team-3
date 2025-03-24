package com.mthree.petadoption.controller;

import com.mthree.petadoption.model.Pet;
import com.mthree.petadoption.service.PetService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PetController {
  private final PetService petService;

  public PetController(PetService petService){
    this.petService = petService;
  }

  @GetMapping("/api/pets")
  public List<Pet> getAllPets(){
    return petService.getAllPets();
  }
}
