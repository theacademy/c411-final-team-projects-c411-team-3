package com.mthree.petadoption.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mthree.petadoption.dao.UserDao;
import com.mthree.petadoption.model.User;

@Service
public class UserServiceImpl implements UserService {
  private final UserDao userDao;

  public UserServiceImpl(UserDao userDao) {
    this.userDao = userDao;
  }

  @Override
    public Optional<User> getUserById(Long id) {
        return userDao.getUser(id);
    }

  @Override
  public User saveUser(User user) {
    return userDao.createUser(user);
  }

  @Override
  public boolean deleteUser(Long id) {
    return userDao.deleteUser(id);
  }

  @Override
  public Optional<User> updateUser(Long id, User user) {
    Optional<User> existingUser = userDao.getUser(id);
    if ( existingUser.isPresent()){
      User userToUpdate = existingUser.get();
      userToUpdate.setUsername(user.getUsername());
      userToUpdate.setEmail(user.getEmail());
      userToUpdate.setRole(user.getRole());
      User updatedUser = userDao.updateUser(userToUpdate);
      return Optional.of(updatedUser);
    }
    return Optional.empty();
  }
}
