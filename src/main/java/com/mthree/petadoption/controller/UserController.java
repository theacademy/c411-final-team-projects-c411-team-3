package com.mthree.petadoption.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mthree.petadoption.dto.UserRegistrationDTO;
import com.mthree.petadoption.model.User;
import com.mthree.petadoption.model.UserInfo;
import com.mthree.petadoption.service.UserService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
    String username = credentials.get("username");
    String password = credentials.get("password");

    Optional<User> userOpt = userService.findByUsername(username);
    if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
      return ResponseEntity.ok(userOpt.get());
    }
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> getUserById(@PathVariable Long id) {
    Optional<User> userOptional = userService.getUserById(id);
      return userOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping("/register")
  public ResponseEntity<User> createUser(@RequestBody UserRegistrationDTO userDTO) {
    User user = new User();
    user.setUsername(userDTO.username());
    user.setEmail(userDTO.email());
    user.setPassword(userDTO.password());
    User createdUser = userService.saveUser(user);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
  }

  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
    Optional<User> updatedUser = userService.updateUser(id, user);
      return updatedUser.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    boolean deleted = userService.deleteUser(id);
    if (deleted) {
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
  }

  @GetMapping("{id}/info")
  public ResponseEntity<UserInfo> getUserInfo(@PathVariable Long id) {
    Optional<UserInfo> userInfoOptional = userService.getUserInfoByUserId(id);
    return userInfoOptional.map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}/info")
  public ResponseEntity<UserInfo> updateUserInfo(@PathVariable Long id, @RequestBody UserInfo userInfo) {
    Optional<UserInfo> updatedUserInfo = userService.updateUserInfo(id, userInfo);
    return updatedUserInfo.map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }
}