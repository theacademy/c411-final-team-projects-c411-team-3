package com.mthree.petadoption.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mthree.petadoption.dao.PetDAO;
import com.mthree.petadoption.model.Pet;

@Service
public class PetServiceImpl implements PetService {
  private final PetDAO petDAO;

  public PetServiceImpl(PetDAO petDAO) {
    this.petDAO = petDAO;
  }

  @Override
  public List<Pet> getAllPets() {
    return petDAO.findAllPets();
  }
}
