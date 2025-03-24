package com.mthree.petadoption.service;

import java.util.Optional;

import com.mthree.petadoption.model.User;

public interface UserService {
  Optional<User> getUserById(Long id);
  User saveUser(User user);
  boolean deleteUser(Long id);
  Optional<User> updateUser(Long id, User user);
}
