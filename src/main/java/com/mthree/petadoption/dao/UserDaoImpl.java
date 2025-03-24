package com.mthree.petadoption.dao;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.mthree.petadoption.model.User;
import com.mthree.petadoption.repository.UserRepository;

@Repository
public class UserDaoImpl implements UserDao{

    private final UserRepository userRepository;

    public UserDaoImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<User> getUser(long userId) {
        return userRepository.findById(userId);
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public boolean deleteUser(long userId) {
        if (userRepository.existsById(userId)){
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }

    @Override
    public User updateUser(User user){
        return userRepository.save(user);
    }
}
