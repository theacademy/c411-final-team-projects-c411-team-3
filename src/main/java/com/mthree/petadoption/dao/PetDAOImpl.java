package com.mthree.petadoption.dao;

import com.mthree.petadoption.model.Pet;
import com.mthree.petadoption.repository.PetRepository;

import java.util.List;

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
