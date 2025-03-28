package com.mthree.petadoption.repository;

import com.mthree.petadoption.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {
  Request findRequestById(Long requestId);
  List<Request> findAllByUserId(Long userId);
}
