package com.mthree.petadoption.dao;

import java.util.Optional;

import com.mthree.petadoption.model.User;


public interface UserDao {
    Optional<User> getUser(long userId);

    User createUser(User user);

    boolean deleteUser(long userId);

    User updateUser(User user);
}
