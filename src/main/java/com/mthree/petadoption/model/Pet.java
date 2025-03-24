package com.mthree.petadoption.model;

import jakarta.persistence.*;

@Entity
@Table(name = "pets")
public class Pet {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long petId;

  private String species;
  private String size;
  private String sex;
  private String age;
  private String petName;
  private String primaryBreed;
  private String secondaryBreed;
  private String stateCode;
  private String city;
  private String photoUrl;
  private String status;

  public Pet() {
  }

  public Pet(String species, String size, String sex, String age, String petName,
             String primaryBreed, String secondaryBreed, String stateCode, String city,
             String photoUrl, String status) {
    this.species = species;
    this.size = size;
    this.sex = sex;
    this.age = age;
    this.petName = petName;
    this.primaryBreed = primaryBreed;
    this.secondaryBreed = secondaryBreed;
    this.stateCode = stateCode;
    this.city = city;
    this.photoUrl = photoUrl;
    this.status = status;
  }

  public Long getPetId() {
    return petId;
  }

  public void setPetId(Long petId) {
    this.petId = petId;
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

  public String getPetName() {
    return petName;
  }

  public void setPetName(String petName) {
    this.petName = petName;
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

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }
}
