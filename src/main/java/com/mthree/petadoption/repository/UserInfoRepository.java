package com.mthree.petadoption.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mthree.petadoption.model.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
    Optional<UserInfo> findByUser_Id(Long userId);
}
