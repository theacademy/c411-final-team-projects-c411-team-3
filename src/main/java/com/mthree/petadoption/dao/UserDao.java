package com.mthree.petadoption.dao;

import java.util.Optional;

import com.mthree.petadoption.model.User;
import com.mthree.petadoption.model.UserInfo;


public interface UserDao {
    Optional<User> getUser(long userId);

    User createUser(User user);

    boolean deleteUser(long userId);

    User updateUser(User user);

    Optional<UserInfo> findByUserId(Long userId);

    UserInfo updateUserInfo(UserInfo userInfo);

    Optional<User> findByUsername(String username);

}
