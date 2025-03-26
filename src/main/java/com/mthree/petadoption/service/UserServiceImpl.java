package com.mthree.petadoption.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mthree.petadoption.dao.UserDao;
import com.mthree.petadoption.model.User;
import com.mthree.petadoption.model.UserInfo;

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
    user.setRole(User.Role.ADOPTER);
    return userDao.createUser(user);
  }

  @Override
  public boolean deleteUser(Long id) {
    return userDao.deleteUser(id);
  }

  @Override
  public Optional<User> updateUser(Long id, User user) {
    Optional<User> existingUser = userDao.getUser(id);
    if (existingUser.isPresent()) {
      User userToUpdate = existingUser.get();
      userToUpdate.setUsername(user.getUsername());
      userToUpdate.setEmail(user.getEmail());
      userToUpdate.setPassword(user.getPassword());
      User updatedUser = userDao.updateUser(userToUpdate);
      return Optional.of(updatedUser);
    }
    return Optional.empty();
  }

  @Override
  public Optional<UserInfo> getUserInfoByUserId(Long userId) {
    return userDao.findByUserId(userId);
  }

  @Override
  public Optional<UserInfo> updateUserInfo(Long userId, UserInfo userInfo) {
    Optional<UserInfo> existingUserInfo = userDao.findByUserId(userId);
    if (existingUserInfo.isPresent()) {
      UserInfo infoToUpdate = existingUserInfo.get();
      infoToUpdate.setFirstName(userInfo.getFirstName());
      infoToUpdate.setLastName(userInfo.getLastName());
      infoToUpdate.setPhoneNumber(userInfo.getPhoneNumber());
      infoToUpdate.setBirthDate(userInfo.getBirthDate());
      UserInfo updatedInfo = userDao.updateUserInfo(infoToUpdate);
      return Optional.of(updatedInfo);
    }
    return Optional.empty();
  }

  @Override
  public Optional<User> findByUsername(String username) {
    return userDao.findByUsername(username);
  }


}
