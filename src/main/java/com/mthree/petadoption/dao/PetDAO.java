package com.mthree.petadoption.dao;

import com.mthree.petadoption.model.Pet;

import java.util.List;

public interface PetDAO {
  List<Pet> findAllPets();
}
