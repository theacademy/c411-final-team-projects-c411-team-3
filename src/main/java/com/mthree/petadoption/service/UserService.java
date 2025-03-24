package com.mthree.petadoption.service;

import com.mthree.petadoption.model.User;
import com.mthree.petadoption.model.UserInfo;

public interface UserService {

    User getUser(long userId);

    User createUser(User user);

    void deleteUser(long userId);

    void updatePassword(long userId,String newPassword);

    void updateUserInfo(long userId, UserInfo userInfo);

}
