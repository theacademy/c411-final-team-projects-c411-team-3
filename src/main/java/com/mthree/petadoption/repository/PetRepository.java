package com.mthree.petadoption.repository;

import com.mthree.petadoption.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
  List<Pet> findBySpecies(String species);
}
