package com.mthree.petadoption.repository;

import com.mthree.petadoption.model.User;
import com.mthree.petadoption.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    UserInfo findByUser(User user);
}
