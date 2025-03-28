package com.mthree.petadoption.controller;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mthree.petadoption.dto.pet.PetResponse;
import com.mthree.petadoption.model.Pet;
import com.mthree.petadoption.service.PetService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/pets")
public class PetController {
  private final PetService petService;

  public PetController(PetService petService) {
    this.petService = petService;
  }

  // leave this here temporary, might use it later
  // will delete it later if it's not gonna be used
  // @GetMapping("/all")
  // public List<Pet> getAllPets() {
  // return petService.getAllPets();
  // }

  @GetMapping
  public Page<Pet> getAllPets(@RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    return petService.getAllPets(PageRequest.of(page, size));
  }

  @GetMapping("/{id}")
  public ResponseEntity<Pet> getPetById(@PathVariable Long id) {
    Optional<Pet> pet = petService.getPetById(id);
    if (pet.isPresent()) {
      return ResponseEntity.ok(pet.get());
    }
    return ResponseEntity.notFound().build();
  }

  @PostMapping
  public ResponseEntity<Pet> createPet(@RequestBody Pet pet) {
    Pet newPet = petService.savePet(pet);
    return ResponseEntity.status(HttpStatus.CREATED).body(newPet);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletePet(@PathVariable Long id) {
    boolean deleted = petService.deletePet(id);
    if (deleted) {
      return ResponseEntity.ok().build();
    }
    return ResponseEntity.notFound().build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<Pet> updatePet(@PathVariable Long id, @RequestBody Pet pet) {
    Optional<Pet> updatedPet = petService.updatePet(id, pet);
    if (updatedPet.isPresent()) {
      return ResponseEntity.ok(updatedPet.get());
    }

    return ResponseEntity.notFound().build();
  }

  @GetMapping("/species/{species}")
  public ResponseEntity<PetResponse> getPetsBySpecies(
      @PathVariable String species,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {
    Page<Pet> petsPage = petService.getPetsBySpecies(species, PageRequest.of(page, size));
    return ResponseEntity.ok(new PetResponse(
        petsPage.getContent(),
        petsPage.getNumber(),
        petsPage.getSize(),
        petsPage.getTotalElements(),
        petsPage.getTotalPages(),
        petsPage.isLast()));
  }
}
