package com.mthree.petadoption.service;

import java.util.List;
import java.util.Optional;

import com.mthree.petadoption.model.Pet;

public interface PetService {
  List<Pet> getAllPets();
  Optional<Pet> getPetById(Long id);
  Pet savePet(Pet pet);
  Optional<Pet> updatePet(Long id, Pet pet);
  boolean deletePet(Long id);
}
