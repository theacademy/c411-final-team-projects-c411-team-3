package com.mthree.petadoption;

import com.mthree.petadoption.model.User;
import com.mthree.petadoption.model.User.Role;
import com.mthree.petadoption.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

  @Bean
  CommandLineRunner insertAdmin(UserRepository userRepository) {
    return args -> {
      if (!userRepository.existsById(1L)) {
        User admin = new User();
        admin.setUsername("admin");
        admin.setEmail("admin@example.com");
        admin.setPassword("admin111");
        admin.setRole(Role.ADMIN);

        userRepository.save(admin);
      }
    };
  }
}
