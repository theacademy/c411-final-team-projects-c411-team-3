package com.mthree.petadoption.controller;

import com.mthree.petadoption.model.User;
import com.mthree.petadoption.model.UserInfo;
import com.mthree.petadoption.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUser(@PathVariable long userId) {
        User user = userService.getUser(userId);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable long userId) {
        userService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{userId}/password")
    public ResponseEntity<Void> updatePassword(@PathVariable long userId, @RequestBody String newPassword) {
        userService.updatePassword(userId, newPassword);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{userId}/info")
    public ResponseEntity<Void> updateUserInfo(@PathVariable long userId, @RequestBody UserInfo userInfo) {
        userService.updateUserInfo(userId, userInfo);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}