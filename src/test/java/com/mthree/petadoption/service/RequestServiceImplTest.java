package com.mthree.petadoption.service;

import com.mthree.petadoption.dao.RequestDao;
import com.mthree.petadoption.dao.RequestDaoImpl;
import com.mthree.petadoption.model.Pet;
import com.mthree.petadoption.model.Request;
import com.mthree.petadoption.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
class RequestServiceImplTest {
    @InjectMocks
    private RequestServiceImpl requestService;

    @Mock
    private RequestDaoImpl requestDao;

    @Mock
    private UserService userService;

    @Mock
    private PetService petService;

    private User mockUser;
    private Pet mockPet;
    private Request mockRequest;

    @BeforeEach
    void setUp() {
        mockUser = new User();
        mockUser.setUsername("tj");
        mockUser.setEmail("tj@example.com");
        mockUser.setPassword("init123");
        mockUser.setRole(User.Role.ADOPTER);

        mockPet = new Pet();
        mockPet.setPetId(1L);
        mockPet.setPetName("Buddy");

        mockRequest = new Request();
        mockRequest.setUser(mockUser);
        mockRequest.setPet(mockPet);
        mockRequest.setMessage("Looking to adopt Buddy!");
        mockRequest.setRequestDate(LocalDate.of(2025, 3, 26));
        mockRequest.setStatus(Request.Status.PENDING);
    }

    @Test
    void testListAllRequests() {
        when(requestDao.listAllRequests()).thenReturn(List.of(mockRequest));

        List<Request> result = requestService.listAllRequests();

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("Looking to adopt Buddy!", result.get(0).getMessage());
    }

    @Test
    void testViewRequest_found() {
        when(requestDao.viewRequest(1L)).thenReturn(mockRequest);

        Request result = requestService.viewRequest(1L);

        assertNotNull(result);
        assertEquals("Looking to adopt Buddy!", result.getMessage());
    }

    @Test
    void testViewRequest_notFound() {
        when(requestDao.viewRequest(999L)).thenReturn(null);

        Request result = requestService.viewRequest(999L);

        assertNull(result);
    }

    @Test
    void testSubmitRequest_success() {
        Map<String, Object> requestData = new HashMap<>();
        requestData.put("userId", 1L);
        requestData.put("petId", 1L);
        requestData.put("message", "Looking to adopt Buddy!");
        requestData.put("requestDate", "2025-03-26");

        when(userService.getUserById(1L)).thenReturn(Optional.of(mockUser));
        when(petService.getPetById(1L)).thenReturn(Optional.of(mockPet));
        when(requestDao.submitRequest(any(Request.class))).thenReturn(mockRequest);

        Request result = requestService.submitRequest(requestData);

        assertNotNull(result);
        assertEquals("Looking to adopt Buddy!", result.getMessage());
        assertEquals(Request.Status.PENDING, result.getStatus());
    }

    @Test
    void testSubmitRequest_invalidUser() {
        Map<String, Object> requestData = new HashMap<>();
        requestData.put("userId", 99L);
        requestData.put("petId", 1L);
        requestData.put("message", "Looking to adopt Buddy!");
        requestData.put("requestDate", "2025-03-26");

        when(userService.getUserById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> requestService.submitRequest(requestData));

        assertEquals("Invalid User ID - request rejected", exception.getMessage());
    }

    @Test
    void testSubmitRequest_invalidPet() {
        Map<String, Object> requestData = new HashMap<>();
        requestData.put("userId", 1L);
        requestData.put("petId", 99L);
        requestData.put("message", "Looking to adopt Buddy!");
        requestData.put("requestDate", "2025-03-26");

        when(userService.getUserById(1L)).thenReturn(Optional.of(mockUser));
        when(petService.getPetById(99L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> requestService.submitRequest(requestData));

        assertEquals("Invalid Pet ID - request rejected", exception.getMessage());
    }

    @Test
    void testSubmitRequest_missingMessage() {
        Map<String, Object> requestData = new HashMap<>();
        requestData.put("userId", 1L);
        requestData.put("petId", 1L);
        requestData.put("message", "");
        requestData.put("requestDate", "2025-03-26");

        when(userService.getUserById(1L)).thenReturn(Optional.of(mockUser));
        when(petService.getPetById(1L)).thenReturn(Optional.of(mockPet));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> requestService.submitRequest(requestData));

        assertEquals("Message is required.", exception.getMessage());
    }


    @Test
    void testUpdateRequest() {
        //pass-through method
    }

    @Test
    void testCancelRequest() {
        doNothing().when(requestDao).cancelRequest(1L);

        requestService.cancelRequest(1L);

        verify(requestDao, times(1)).cancelRequest(1L);
    }

}