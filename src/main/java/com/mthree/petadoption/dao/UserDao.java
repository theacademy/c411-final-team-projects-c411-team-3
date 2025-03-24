package com.mthree.petadoption.dao;

import com.mthree.petadoption.model.Request;
import com.mthree.petadoption.model.User;
import com.mthree.petadoption.model.UserInfo;


public interface UserDao {
    User getUser(long userId);

    User createUser(User user);

    void deleteUser(long userId);

    void updatePassword(long userId,String newPassword);

    void updateUserInfo(long userId, UserInfo userInfo);
}
