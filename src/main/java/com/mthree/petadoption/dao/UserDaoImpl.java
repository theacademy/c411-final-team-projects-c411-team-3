package com.mthree.petadoption.dao;

import com.mthree.petadoption.model.User;
import com.mthree.petadoption.model.UserInfo;
import com.mthree.petadoption.repository.UserInfoRepository;
import com.mthree.petadoption.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

public class UserDaoImpl implements UserDao{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Override
    public User getUser(long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(long userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public void updatePassword(long userId, String newPassword) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setPassword(newPassword);
        userRepository.save(user);
    }

    @Override
    public void updateUserInfo(long userId, UserInfo newInfo) {
        UserInfo oldInfo =userInfoRepository.findByUser(userId);

        oldInfo.setBirthDate(newInfo.getBirthDate());
        oldInfo.setFirstName(newInfo.getFirstName());
        oldInfo.setLastName(newInfo.getLastName());
        oldInfo.setPhoneNumber(newInfo.getPhoneNumber());
        userInfoRepository.save(oldInfo);

    }
}
