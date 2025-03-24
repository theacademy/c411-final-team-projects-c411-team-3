package com.mthree.petadoption.repository;

import com.mthree.petadoption.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet, Long> {
}
