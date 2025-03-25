package com.mthree.petadoption.dao;

import com.mthree.petadoption.model.Pet;
import com.mthree.petadoption.model.Request;
import com.mthree.petadoption.model.User;
import com.mthree.petadoption.repository.PetRepository;
import com.mthree.petadoption.repository.RequestRepository;
import com.mthree.petadoption.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.time.LocalDate;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RequestDaoImplTest {

    @InjectMocks
    private RequestDaoImpl requestDao;

    @Mock
    private RequestRepository requestRepository;

    @Mock
    private PetRepository petRepository;

    @Mock
    private UserRepository userRepository;

    private User mockUser;
    private Pet mockPet;
    private Request mockRequest;

    @BeforeEach
    void setUp() {
        mockUser = new User();
        mockUser.setUsername("tj");
        mockUser.setId(1L);
        mockUser.setEmail("tj@example.com");

        mockPet = new Pet();
        mockPet.setPetId(2L); // Ensuring pet ID is set
        mockPet.setPetName("Fluffy");

        mockRequest = new Request();
        mockRequest.setUser(mockUser);
        mockRequest.setPet(mockPet);
        mockRequest.setRequestDate(LocalDate.now());
        mockRequest.setStatus(Request.Status.PENDING);
        mockRequest.setMessage("I want to adopt this pet.");

        lenient().when(userRepository.existsById(anyLong())).thenReturn(true);
        lenient().when(petRepository.existsById(anyLong())).thenReturn(true);
    }

    @Test
    void testSubmitRequest() {
        when(userRepository.existsById(mockUser.getId())).thenReturn(true);
        when(petRepository.existsById(mockPet.getPetId())).thenReturn(true);
        when(requestRepository.save(any(Request.class))).thenReturn(mockRequest);

        Request savedRequest = requestDao.submitRequest(mockRequest);
        assertNotNull(savedRequest);
        assertEquals(mockRequest.getMessage(), savedRequest.getMessage());
        verify(requestRepository).save(mockRequest);
    }
    @Test
    void testSubmitRequest_MissingUserAndPet() {
        Request invalidRequest = new Request(); // No user, no pet

        Exception exception = assertThrows(RuntimeException.class, () -> requestDao.submitRequest(invalidRequest));

        assertEquals("You must provide at least one user and/or pet", exception.getMessage());
    }

    @Test
    void testSubmitRequest_InvalidUser() {
        when(userRepository.existsById(anyLong())).thenReturn(false);

        Exception exception = assertThrows(RuntimeException.class, () -> requestDao.submitRequest(mockRequest));

        assertEquals("Invalid User ID - request rejected", exception.getMessage());
        verify(requestRepository, never()).save(any());
    }


    @Test
    void testSubmitRequest_InvalidPet() {
        when(userRepository.existsById(anyLong())).thenReturn(true);
        when(petRepository.existsById(anyLong())).thenReturn(false);

        Exception exception = assertThrows(RuntimeException.class, () -> requestDao.submitRequest(mockRequest));

        assertEquals("Invalid Pet ID - request rejected", exception.getMessage());
        verify(requestRepository, never()).save(any());
    }

    @Test
    void testViewRequest() {
        when(requestRepository.findById(1L)).thenReturn(Optional.of(mockRequest));

        Request foundRequest = requestDao.viewRequest(1L);
        assertNotNull(foundRequest);
        assertEquals(mockRequest.getMessage(), foundRequest.getMessage());
        verify(requestRepository).findById(1L);
    }

    @Test
    void testViewRequest_NotFound() {
        when(requestRepository.findById(99L)).thenReturn(Optional.empty());

        Request foundRequest = requestDao.viewRequest(99L);
        assertNull(foundRequest);

        verify(requestRepository).findById(99L);
    }

    @Test
    void testUpdateRequest() {
        when(requestRepository.findRequestById(anyLong())).thenReturn(mockRequest);
        when(petRepository.findById(anyLong())).thenReturn(Optional.of(mockPet));
        when(requestRepository.save(any(Request.class))).thenReturn(mockRequest);

        Request updatedRequest = requestDao.updateRequest(1L, mockPet.getPetId(), "APPROVED");

        assertEquals(Request.Status.APPROVED, updatedRequest.getStatus());
        assertEquals(mockPet, updatedRequest.getPet());
        verify(requestRepository).save(mockRequest);
    }

    @Test
    void testUpdateRequest_InvalidStatus() {
        when(requestRepository.findRequestById(1L)).thenReturn(mockRequest);

        Exception exception = assertThrows(RuntimeException.class, () -> requestDao.updateRequest(1L, null, "INVALID_STATUS"));

        assertEquals("Invalid status value: INVALID_STATUS", exception.getMessage());
    }

    @Test
    void testListAllRequests() {
        when(requestRepository.findAll()).thenReturn(java.util.List.of(mockRequest));

        java.util.List<Request> requests = requestDao.listAllRequests();
        assertFalse(requests.isEmpty());
        assertEquals(1, requests.size());
        verify(requestRepository).findAll();
    }

    @Test
    void testCancelRequest() {
        doNothing().when(requestRepository).deleteById(1L);

        requestDao.cancelRequest(1L);
        verify(requestRepository).deleteById(1L);
    }
}
