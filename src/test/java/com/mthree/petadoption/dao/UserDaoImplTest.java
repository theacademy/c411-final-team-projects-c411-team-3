package com.mthree.petadoption.dao;

import com.mthree.petadoption.model.User;
import com.mthree.petadoption.model.UserInfo;
import com.mthree.petadoption.repository.UserRepository;
import com.mthree.petadoption.repository.UserInfoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class UserDaoImplTest {

    @InjectMocks
    private UserDaoImpl userDao;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserInfoRepository userInfoRepository;

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
    void testCreateUser() {
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        User created = userDao.createUser(mockUser);
        assertNotNull(created);
        assertEquals("tj", created.getUsername());
        verify(userRepository).save(mockUser);
    }

    @Test
    void testGetUser() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));

        Optional<User> result = userDao.getUser(1L);
        assertTrue(result.isPresent());
        assertEquals("tj", result.get().getUsername());
        verify(userRepository).findById(1L);
    }

    @Test
    void testDeleteUser_success() {
        when(userRepository.existsById(1L)).thenReturn(true);
        doNothing().when(userRepository).deleteById(1L);

        boolean deleted = userDao.deleteUser(1L);
        assertTrue(deleted);
        verify(userRepository).deleteById(1L);
    }

    @Test
    void testDeleteUser_fail() {
        when(userRepository.existsById(99L)).thenReturn(false);

        boolean deleted = userDao.deleteUser(99L);
        assertFalse(deleted);
        verify(userRepository, never()).deleteById(anyLong());
    }

    @Test
    void testUpdateUser() {
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        User updated = userDao.updateUser(mockUser);
        assertEquals("tj", updated.getUsername());
        verify(userRepository).save(mockUser);
    }

    @Test
    void testFindUserInfoByUserId() {
        UserInfo info = new UserInfo();
        info.setFirstName("Tianjing");

        when(userInfoRepository.findByUser_Id(1L)).thenReturn(Optional.of(info));

        Optional<UserInfo> result = userDao.findByUserId(1L);
        assertTrue(result.isPresent());
        assertEquals("Tianjing", result.get().getFirstName());
    }

    @Test
    void testUpdateUserInfo() {
        UserInfo info = new UserInfo();
        info.setFirstName("New");
        info.setLastName("Name");
        info.setPhoneNumber("1234567890");
        info.setBirthDate(LocalDate.of(1999, 1, 1));
        info.setUser(mockUser);

        when(userInfoRepository.save(any(UserInfo.class))).thenReturn(info);

        UserInfo updated = userDao.updateUserInfo(info);
        assertEquals("New", updated.getFirstName());
        verify(userInfoRepository).save(info);
    }
}
