package com.mthree.petadoption.service;

import java.util.Optional;

import com.mthree.petadoption.model.User;
import com.mthree.petadoption.model.UserInfo;

public interface UserService {
  Optional<User> getUserById(Long id);

  User saveUser(User user);

  boolean deleteUser(Long id);

  Optional<User> updateUser(Long id, User user);

  Optional<UserInfo> getUserInfoByUserId(Long userId);

  Optional<UserInfo> updateUserInfo(Long userId, UserInfo userinfo);

  Optional<User> findByUsername(String username);

}
