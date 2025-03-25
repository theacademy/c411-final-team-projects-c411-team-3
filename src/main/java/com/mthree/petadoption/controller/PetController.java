package com.mthree.petadoption.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mthree.petadoption.model.Pet;
import com.mthree.petadoption.service.PetService;





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

  @GetMapping("/api/pets/{id}")
  public ResponseEntity<Pet> getPetById(@PathVariable Long id) {
      Optional<Pet> pet = petService.getPetById(id);
      if (pet.isPresent()){
        return ResponseEntity.ok(pet.get());
      }
      return ResponseEntity.notFound().build();
  }

  @PostMapping("/api/pets")
  public ResponseEntity<Pet> createPet(@RequestBody Pet pet) {
    Pet newPet = petService.savePet(pet);
    return ResponseEntity.status(HttpStatus.CREATED).body(newPet);
  }

  @DeleteMapping("/api/pets/{id}")
  public ResponseEntity<Void> deletePet(@PathVariable Long id) {
      boolean deleted = petService.deletePet(id);
      if(deleted) {
        return ResponseEntity.ok().build();
      }
      return ResponseEntity.notFound().build();
  }

  @PutMapping("/api/pets/{id}")
  public ResponseEntity<Pet> updatePet(@PathVariable Long id, @RequestBody Pet pet) {
      Optional<Pet> updatedPet = petService.updatePet(id, pet);
      if (updatedPet.isPresent()){
        return ResponseEntity.ok(updatedPet.get());
      }
      
      return ResponseEntity.notFound().build();
  }
}
