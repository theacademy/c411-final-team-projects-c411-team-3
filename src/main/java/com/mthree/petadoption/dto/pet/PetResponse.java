package com.mthree.petadoption.dto.pet;

import java.util.List;

import com.mthree.petadoption.model.Pet;

public record PetResponse(
    List<Pet> content,
    int pageNumber,
    int pageSize,
    long totalElements,
    int totalPages,
    boolean last) {
}
