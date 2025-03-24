package com.mthree.petadoption.dao;

import com.mthree.petadoption.model.Pet;
import com.mthree.petadoption.model.Request;
import com.mthree.petadoption.model.User;
import com.mthree.petadoption.repository.PetRepository;
import com.mthree.petadoption.repository.RequestRepository;
import com.mthree.petadoption.repository.UserRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class RequestDaoImplTest {
    private User user;
    private Pet pet;

    private RequestDao requestDao;
    private RequestRepository requestRepository;
    private UserRepository userRepository;
    private PetRepository petRepository;

    @Autowired
    public void RequestDaoImplTest(RequestRepository requestRepository, UserRepository userRepository, PetRepository petRepository) {
        this.requestRepository = requestRepository;
        this.petRepository = petRepository;
        this.userRepository = userRepository;
        this.requestDao = new RequestDaoImpl(requestRepository, petRepository, userRepository);
    }

    @BeforeEach
    public void setUp(){
        user = new User();
        user.setUsername("john_doe");
        user.setEmail("john@example.com");
        userRepository.save(user);

        pet = new Pet();
        pet.setPetName("Charlie");
        pet.setSpecies("Dog");
        petRepository.save(pet);
    }

    @Test
    void submitRequest() {
    }

    @Test
    void listAllRequests() {
        List<Request> newList = requestDao.listAllRequests();
        assertNotNull(newList);
        assertEquals(2, newList.size());
    }

    @Test
    void viewRequest() {
    }

    @Test
    void updateRequest() {
    }

    @Test
    void cancelRequest() {
    }
}