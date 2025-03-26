package com.mthree.petadoption.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PetApiResponseDTO {
  @JsonProperty("pets")
  private List<PetApiDTO> pets;

  public List<PetApiDTO> getPets() {
    return pets;
  }

  public void setPets(List<PetApiDTO> pets) {
    this.pets = pets;
  }
}
