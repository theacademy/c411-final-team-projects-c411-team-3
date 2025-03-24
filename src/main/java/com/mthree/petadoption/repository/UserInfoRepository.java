package com.mthree.petadoption.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mthree.petadoption.model.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    // UserInfo findByUser(long user);
}
