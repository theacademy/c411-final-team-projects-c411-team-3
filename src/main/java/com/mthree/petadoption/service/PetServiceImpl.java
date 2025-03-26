package com.mthree.petadoption.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
  public Pet savePet(Pet pet) {
    validatePet(pet);
    return petDAO.savePet(pet);
  }

  @Override
  public boolean deletePet(Long id) {
    return petDAO.deletePet(id);
  }

  @Override
  public List<Pet> getPetsBySpecies(String species) {
    return petDAO.findPetBySpecies(species);
  }

  @Override
  public Optional<Pet> updatePet(Long id, Pet pet) {
    validatePet(pet);

    Optional<Pet> existingPetOpt = petDAO.findPetById(id);
    if (existingPetOpt.isPresent()) {
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

  private void validatePet(Pet pet) {
    if (pet.getSpecies() == null || pet.getSpecies().trim().isEmpty()) {
      throw new IllegalArgumentException("Species is required.");
    }
    if (pet.getSex() == null || pet.getSex().trim().isEmpty()) {
      throw new IllegalArgumentException("Sex is required.");
    } else {
      String sex = pet.getSex().trim().toLowerCase();
      if (!sex.equals("m") && !sex.equals("f")) {
        throw new IllegalArgumentException("Sex must be 'm' or 'f'.");
      }
    }
    if (pet.getAge() == null || pet.getAge().trim().isEmpty()) {
      throw new IllegalArgumentException("Age is required.");
    }
    if (pet.getPetName() == null || pet.getPetName().trim().isEmpty()) {
      throw new IllegalArgumentException("Pet name is required.");
    }
    if (pet.getPrimaryBreed() == null || pet.getPrimaryBreed().trim().isEmpty()) {
      throw new IllegalArgumentException("Primary breed is required.");
    }
    if (pet.getStatus() == null || pet.getStatus().trim().isEmpty()) {
      throw new IllegalArgumentException("Status is required.");
    }
  }

  @Override
  public Page<Pet> getAllPets(Pageable pageable) {
    return petDAO.findAllPets(pageable);
  }
}
