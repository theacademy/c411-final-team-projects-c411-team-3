package com.mthree.petadoption.repository;

import com.mthree.petadoption.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
