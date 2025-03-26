package com.mthree.petadoption.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.mthree.petadoption.dto.PetApiDTO;
import com.mthree.petadoption.dto.PetApiResponseDTO;
import com.mthree.petadoption.model.Pet;
import com.mthree.petadoption.repository.PetRepository;

@Service
public class PetDataFetchService {
  private final PetRepository petRepository;
  private final RestTemplate restTemplate;

  @Value("${api.key}")
  private String apiKey;

  @Value("${fetch.token}")
  private String SECRET;

  // @Value("${api.zipcode}")
  // private String zipCode;

  private static final String[] SPECIES = { "cat", "dog", "rabbit", "bird", "reptile", "small_animal" };

  public PetDataFetchService(PetRepository petRepository) {
    this.petRepository = petRepository;
    this.restTemplate = new RestTemplate();
  }

  public String fetchAndStorePets(String token, String zipcode) {
    if (!token.equals(SECRET)) {
      return "Invalid token. Fetch failed.";
    }

    int storedPets = 0;
    for (String species : SPECIES) {
      String apiUrl = "https://api-staging.adoptapet.com/search/pet_search?key=" + apiKey +
          "&v=3&output=json&city_or_zip=" + zipcode +
          "&geo_range=10&species=" + species +
          "&start_number=1&end_number=100";

      try {
        PetApiResponseDTO response = restTemplate.getForObject(apiUrl, PetApiResponseDTO.class);

        if (response != null && response.getPets() != null) {
          storedPets += savePetsToDatabase(species, response.getPets());
        }
      } catch (Exception e) {
        e.printStackTrace();
        return "Error occurred during fetching.";
      }
    }
    return "Successfully stored " + storedPets + " pets.";
  }

  private int savePetsToDatabase(String species, List<PetApiDTO> petList) {
    int count = 0;
    for (PetApiDTO petDTO : petList) {
      if (petDTO.getSex() == null)
        continue;

      Pet pet = new Pet(
          species,
          petDTO.getSize(),
          petDTO.getSex(),
          petDTO.getAge(),
          petDTO.getPetName(),
          petDTO.getPrimaryBreed(),
          petDTO.getSecondaryBreed(),
          petDTO.getStateCode(),
          petDTO.getCity(),
          petDTO.getPhotoUrl(),
          "available");

      petRepository.save(pet);
      count++;
    }
    return count;
  }
}
