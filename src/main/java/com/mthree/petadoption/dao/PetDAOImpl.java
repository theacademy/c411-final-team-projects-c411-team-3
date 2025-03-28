package com.mthree.petadoption.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.mthree.petadoption.model.Pet;
import com.mthree.petadoption.repository.PetRepository;

@Repository
public class PetDAOImpl implements PetDAO {
  private final PetRepository petRepository;

  public PetDAOImpl(PetRepository petRepository) {
    this.petRepository = petRepository;
  }

  @Override
  public List<Pet> findAllPets() {
    return petRepository.findAll();
  }

  @Override
  public Optional<Pet> findPetById(Long id) {
    return petRepository.findById(id);
  }

  @Override
  public Pet savePet(Pet pet) {
    return petRepository.save(pet);
  }

  @Override
  public boolean deletePet(Long id) {
    if (petRepository.existsById(id)) {
      petRepository.deleteById(id);
      return true;
    }
    return false;
  }

  @Override
  public List<Pet> findPetBySpecies(String species) {
    return petRepository.findBySpecies(species);
  }

  @Override
  public Pet updatePet(Pet pet) {
    return petRepository.save(pet);
  }

  @Override
  public Page<Pet> findAllPets(Pageable pageable) {
    return petRepository.findAll(pageable);
  }

  @Override
  public Page<Pet> findPetBySpecies(String species, Pageable pageable) {
    return petRepository.findBySpecies(species, pageable);
  }
}
