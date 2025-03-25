package com.mthree.petadoption.service;

import java.util.List;
import java.util.Optional;

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

  @Override
  public Optional<Pet> getPetById(Long id) {
    return petDAO.findPetById(id);
  }

  @Override
  public Pet savePet(Pet pet){
    return petDAO.savePet(pet);
  }

  @Override
  public boolean deletePet(Long id) {
    return petDAO.deletePet(id);
  }

  @Override
  public Optional<Pet> updatePet(Long id, Pet pet) {
    Optional<Pet> existingPetOpt = petDAO.findPetById(id);
    if (existingPetOpt.isPresent()){
      Pet existingPet = existingPetOpt.get();
      existingPet.setSpecies(pet.getSpecies());
      existingPet.setSize(pet.getSize());
      existingPet.setSex(pet.getSex());
      existingPet.setAge(pet.getAge());
      existingPet.setPetName(pet.getPetName());
      existingPet.setPrimaryBreed(pet.getPrimaryBreed());
      existingPet.setSecondaryBreed(pet.getSecondaryBreed());
      existingPet.setStateCode(pet.getStateCode());
      existingPet.setCity(pet.getCity());
      existingPet.setPhotoUrl(pet.getPhotoUrl());
      existingPet.setStatus(pet.getStatus());

      Pet updatedPet = petDAO.updatePet(existingPet);
      return Optional.of(updatedPet);
    }
    return Optional.empty();
  }
}
