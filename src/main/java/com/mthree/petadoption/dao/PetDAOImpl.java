package com.mthree.petadoption.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.mthree.petadoption.model.Pet;
import com.mthree.petadoption.repository.PetRepository;

@Repository
public class PetDAOImpl implements PetDAO{
  private final PetRepository petRepository;

  public PetDAOImpl(PetRepository petRepository) {
    this.petRepository = petRepository;
  }
  @Override
  public List<Pet> findAllPets() {
    return petRepository.findAll();
  }
}
