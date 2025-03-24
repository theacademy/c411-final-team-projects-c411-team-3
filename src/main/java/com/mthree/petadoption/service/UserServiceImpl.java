package com.mthree.petadoption.service;
import com.mthree.petadoption.model.User;
import com.mthree.petadoption.model.UserInfo;
import com.mthree.petadoption.dao.UserDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserDao userDao;

    @Override
    public User getUser(long userId) {
        return userDao.getUser(userId);
    }

    @Override
    public User createUser(User user) {
        return userDao.createUser(user);
    }

    @Override
    public void deleteUser(long userId) {
        userDao.deleteUser(userId);
    }

    @Override
    public void updatePassword(long userId, String newPassword) {
        userDao.updatePassword(userId, newPassword);
    }

    @Override
    public void updateUserInfo(long userId, UserInfo userInfo) {
        userDao.updateUserInfo(userId, userInfo);
    }
}