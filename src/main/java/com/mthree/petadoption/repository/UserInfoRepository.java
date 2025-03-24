package com.mthree.petadoption.repository;

import com.mthree.petadoption.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    UserInfo findByUser(long user);
}
