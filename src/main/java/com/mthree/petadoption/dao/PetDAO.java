package com.mthree.petadoption.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.mthree.petadoption.model.Pet;

public interface PetDAO {
  List<Pet> findAllPets();

  Page<Pet> findAllPets(Pageable pageable);

  Optional<Pet> findPetById(Long id);

  Pet savePet(Pet pet);

  Pet updatePet(Pet pet);

  boolean deletePet(Long id);

  List<Pet> findPetBySpecies(String species);

  Page<Pet> findPetBySpecies(String species, Pageable pageable);
}
