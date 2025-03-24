package com.mthree.petadoption.repository;

import com.mthree.petadoption.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepository extends JpaRepository<Request, Long> {
  Request findRequestById(Long requestId);
}
