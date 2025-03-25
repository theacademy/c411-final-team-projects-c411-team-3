package com.mthree.petadoption.dao;

import java.util.List;
import java.util.Optional;

import com.mthree.petadoption.model.Pet;

public interface PetDAO {
  List<Pet> findAllPets();

  Optional<Pet> findPetById(Long id);

  Pet savePet(Pet pet);

  Pet updatePet(Pet pet);

  boolean deletePet(Long id);
}
