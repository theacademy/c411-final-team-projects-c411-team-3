package com.mthree.petadoption.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.mthree.petadoption.model.Pet;

public interface PetRepository extends JpaRepository<Pet, Long> {
  List<Pet> findBySpecies(String species);

  Page<Pet> findAll(Pageable pageable);
}
