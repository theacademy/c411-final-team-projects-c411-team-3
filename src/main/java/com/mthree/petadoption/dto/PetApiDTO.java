package com.mthree.petadoption.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PetApiDTO {
  @JsonProperty("pet_id")
  private String petId;

  @JsonProperty("pet_name")
  private String petName;

  private String species;
  private String size;
  private String sex;
  private String age;

  @JsonProperty("primary_breed")
  private String primaryBreed;

  @JsonProperty("secondary_breed")
  private String secondaryBreed;

  @JsonProperty("addr_state_code")
  private String stateCode;

  @JsonProperty("addr_city")
  private String city;

  @JsonProperty("large_results_photo_url")
  private String photoUrl;

  // Getters and Setters
  public String getPetId() {
    return petId;
  }

  public void setPetId(String petId) {
    this.petId = petId;
  }

  public String getPetName() {
    return petName;
  }

  public void setPetName(String petName) {
    this.petName = petName;
  }

  public String getSpecies() {
    return species;
  }

  public void setSpecies(String species) {
    this.species = species;
  }

  public String getSize() {
    return size;
  }

  public void setSize(String size) {
    this.size = size;
  }

  public String getSex() {
    return sex;
  }

  public void setSex(String sex) {
    this.sex = sex;
  }

  public String getAge() {
    return age;
  }

  public void setAge(String age) {
    this.age = age;
  }

  public String getPrimaryBreed() {
    return primaryBreed;
  }

  public void setPrimaryBreed(String primaryBreed) {
    this.primaryBreed = primaryBreed;
  }

  public String getSecondaryBreed() {
    return secondaryBreed;
  }

  public void setSecondaryBreed(String secondaryBreed) {
    this.secondaryBreed = secondaryBreed;
  }

  public String getStateCode() {
    return stateCode;
  }

  public void setStateCode(String stateCode) {
    this.stateCode = stateCode;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getPhotoUrl() {
    return photoUrl;
  }

  public void setPhotoUrl(String photoUrl) {
    this.photoUrl = photoUrl;
  }
}