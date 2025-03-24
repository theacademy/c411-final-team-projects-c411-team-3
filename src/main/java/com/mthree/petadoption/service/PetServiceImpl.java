package com.mthree.petadoption.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mthree.petadoption.model.Pet;
import com.mthree.petadoption.repository.PetRepository;

@Service
public class PetServiceImpl implements PetService {
  private final PetRepository petRepository;

  public PetServiceImpl(PetRepository petRepository) {
    this.petRepository = petRepository;
  }

  @Override
  public List<Pet> getAllPets() {
    return petRepository.findAll();
  }
}
