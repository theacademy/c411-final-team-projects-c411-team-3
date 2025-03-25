package com.mthree.petadoption.service;

import com.mthree.petadoption.dao.UserDao;
import com.mthree.petadoption.model.User;
import com.mthree.petadoption.model.UserInfo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class UserServiceImplTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserDao userDao;

    private User mockUser;

    @BeforeEach
    void setUp() {
        mockUser = new User();
        mockUser.setUsername("tj");
        mockUser.setEmail("tj@example.com");
        mockUser.setPassword("init123");
        mockUser.setRole(User.Role.ADOPTER);
    }

    @Test
    void testGetUserById_found() {
        when(userDao.getUser(1L)).thenReturn(Optional.of(mockUser));

        Optional<User> result = userService.getUserById(1L);
        assertTrue(result.isPresent());
        assertEquals("tj", result.get().getUsername());
    }

    @Test
    void testGetUserById_notFound() {
        when(userDao.getUser(2L)).thenReturn(Optional.empty());

        Optional<User> result = userService.getUserById(2L);
        assertFalse(result.isPresent());
    }

    @Test
    void testSaveUser() {
        when(userDao.createUser(any(User.class))).thenReturn(mockUser);

        User result = userService.saveUser(mockUser);
        assertNotNull(result);
        assertEquals("tj", result.getUsername());
    }

    @Test
    void testDeleteUser_success() {
        when(userDao.deleteUser(1L)).thenReturn(true);
        assertTrue(userService.deleteUser(1L));
    }

    @Test
    void testDeleteUser_fail() {
        when(userDao.deleteUser(2L)).thenReturn(false);
        assertFalse(userService.deleteUser(2L));
    }

    @Test
    void testUpdateUser_found() {
        User updated = new User();
        updated.setUsername("newname");
        updated.setEmail("new@email.com");
        updated.setPassword("newpass");
        updated.setRole(User.Role.ADMIN);

        when(userDao.getUser(1L)).thenReturn(Optional.of(mockUser));
        when(userDao.updateUser(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Optional<User> result = userService.updateUser(1L, updated);

        assertTrue(result.isPresent());
        assertEquals("newname", result.get().getUsername());
        assertEquals("ADMIN", result.get().getRole().name());
    }

    @Test
    void testUpdateUser_notFound() {
        when(userDao.getUser(999L)).thenReturn(Optional.empty());

        Optional<User> result = userService.updateUser(999L, new User());
        assertFalse(result.isPresent());
    }

    @Test
    void testUpdateUserInfo_found() {
        UserInfo oldInfo = new UserInfo();
        oldInfo.setFirstName("Old");
        oldInfo.setLastName("Name");

        UserInfo newInfo = new UserInfo();
        newInfo.setFirstName("New");
        newInfo.setLastName("Name");
        newInfo.setPhoneNumber("9999999999");
        newInfo.setBirthDate(LocalDate.of(1999, 1, 1));

        when(userDao.findByUserId(1L)).thenReturn(Optional.of(oldInfo));
        when(userDao.updateUserInfo(any(UserInfo.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Optional<UserInfo> result = userService.updateUserInfo(1L, newInfo);
        assertTrue(result.isPresent());
        assertEquals("New", result.get().getFirstName());
    }

    @Test
    void testUpdateUserInfo_notFound() {
        when(userDao.findByUserId(99L)).thenReturn(Optional.empty());

        Optional<UserInfo> result = userService.updateUserInfo(99L, new UserInfo());
        assertFalse(result.isPresent());
    }

    @Test
    void testGetUserInfoByUserId_found() {
        UserInfo info = new UserInfo();
        info.setFirstName("TJ");
        when(userDao.findByUserId(1L)).thenReturn(Optional.of(info));

        Optional<UserInfo> result = userService.getUserInfoByUserId(1L);
        assertTrue(result.isPresent());
        assertEquals("TJ", result.get().getFirstName());
    }

    @Test
    void testGetUserInfoByUserId_notFound() {
        when(userDao.findByUserId(404L)).thenReturn(Optional.empty());

        Optional<UserInfo> result = userService.getUserInfoByUserId(404L);
        assertFalse(result.isPresent());
    }
}
