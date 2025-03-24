package com.mthree.petadoption.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "requests")
public class Request {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "pet_id")
  private Pet pet;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  private LocalDate requestDate;

  @Column(columnDefinition = "TEXT")
  private String message;

  @Enumerated(EnumType.STRING)
  private Status status;

  public enum Status {
    PENDING, APPROVED, REJECTED
  }

  public Pet getPet() {
    return pet;
  }

  public LocalDate getRequestDate() {
    return requestDate;
  }

  public User getUser() {
    return user;
  }

  public String getMessage() {
    return message;
  }

  public Status getStatus() {
    return status;
  }

  public Long getRequestId() {
    return id;
  }

  public void setPet(Pet pet) {
    this.pet = pet;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public void setRequestDate(LocalDate requestDate) {
    this.requestDate = requestDate;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public void setStatus(Status status) {
    this.status = status;
  }
}

