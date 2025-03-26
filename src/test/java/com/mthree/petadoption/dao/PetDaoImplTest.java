package com.mthree.petadoption.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.mthree.petadoption.model.Pet;
import com.mthree.petadoption.repository.PetRepository;

@ExtendWith(MockitoExtension.class)
class PetDaoImplTest {
  @InjectMocks
  private PetDAOImpl petDAO;

  @Mock
  private PetRepository petRepository;

  private Pet mockPet;

  @BeforeEach
  void setUp() {
    mockPet = new Pet();
    mockPet.setPetId(1L);
    mockPet.setSpecies("Dog");
    mockPet.setSize("Medium");
    mockPet.setSex("M");
    mockPet.setAge("Young");
    mockPet.setPetName("Buddy");
    mockPet.setPrimaryBreed("Labrador");
    mockPet.setStatus("Available");
  }

  @Test
  void testCreatePet() {
    when(petRepository.save(any(Pet.class))).thenReturn(mockPet);

    Pet created = petDAO.savePet(mockPet);
    assertNotNull(created);
    assertEquals("Buddy", created.getPetName());
    verify(petRepository).save(mockPet);
  }

  @Test
  void testFindAllPets() {
    when(petRepository.findAll()).thenReturn(Arrays.asList(mockPet));

    List<Pet> pets = petDAO.findAllPets();

    assertNotNull(pets);
    assertEquals(1, pets.size());
    verify(petRepository, times(1)).findAll();
  }

  @Test
  void testFindPetById() {
    when(petRepository.findById(1L)).thenReturn(Optional.of(mockPet));

    Optional<Pet> foundPet = petDAO.findPetById(1L);

    assertTrue(foundPet.isPresent());
    assertEquals("Buddy", foundPet.get().getPetName());
    verify(petRepository, times(1)).findById(1L);
  }

  @Test
  void testDeletePet() {
    when(petRepository.existsById(1L)).thenReturn(true);
    doNothing().when(petRepository).deleteById(1L);

    boolean result = petDAO.deletePet(1L);

    assertTrue(result);
    verify(petRepository, times(1)).deleteById(1L);
  }

  @Test
  void testFindPetBySpecies() {
    when(petRepository.findBySpecies("Dog")).thenReturn(Arrays.asList(mockPet));

    List<Pet> pets = petDAO.findPetBySpecies("Dog");

    assertNotNull(pets);
    assertFalse(pets.isEmpty());
    assertEquals(1, pets.size());
    assertEquals("Dog", pets.get(0).getSpecies());
    verify(petRepository, times(1)).findBySpecies("Dog");
  }
}
