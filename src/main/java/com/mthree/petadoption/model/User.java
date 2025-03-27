  package com.mthree.petadoption.model;

  import java.time.LocalDate;

  import com.fasterxml.jackson.annotation.JsonIdentityInfo;
  import com.fasterxml.jackson.annotation.JsonIgnore;
  import com.fasterxml.jackson.annotation.ObjectIdGenerators;

  import jakarta.persistence.CascadeType;
  import jakarta.persistence.Column;
  import jakarta.persistence.Entity;
  import jakarta.persistence.EnumType;
  import jakarta.persistence.Enumerated;
  import jakarta.persistence.GeneratedValue;
  import jakarta.persistence.GenerationType;
  import jakarta.persistence.Id;
  import jakarta.persistence.OneToOne;
  import jakarta.persistence.PrePersist;
  import jakarta.persistence.Table;
  import jakarta.validation.constraints.Pattern;

  @Entity
  @Table(name = "users")
  @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
  public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Pattern(regexp = "^[a-zA-Z0-9_]{3,20}$", message = "Username must be 3-20 characters long and only contain letters, numbers, and underscores")
    @Column(name = "username", nullable = false, unique = true, length = 20)
    private String username;

    @Pattern(regexp = "\\S+@\\S+\\.\\S+", message = "Invalid email format")
    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Pattern(
            regexp = "^(?=.*\\d).{6,}$",
            message = "Password must be at least 6 characters long and contain at least one digit"
    )
    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 20)
    private Role role;
    @JsonIgnore
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private UserInfo userInfo;

    public enum Role {
      ADMIN, ADOPTER
    }

    public User() {
    }

    public User(String username, String email, String password, Role role) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.role = role;
    }

    public Long getId() {
      return id;
    }

    public String getUsername() {
      return username;
    }

    public void setUsername(String username) {
      this.username = username;
    }

    public String getEmail() {
      return email;
    }

    public void setEmail(String email) {
      this.email = email;
    }

    public String getPassword() {
      return password;
    }

    public void setPassword(String password) {
      this.password = password;
    }

    public Role getRole() {
      return role;
    }

    public void setRole(Role role) {
      this.role = role;
    }

    public void setId(Long id) {
      this.id = id;
    }

    /*
     * helper methods to create an empty userinfo when a new user is created
     */
    public UserInfo getUserInfo() {
      return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
      // maintain bidirectional relationship
      if (userInfo == null) {
        if (this.userInfo != null) {
          this.userInfo.setUser(null);
        }
      } else {
        userInfo.setUser(this);
      }
      this.userInfo = userInfo;
    }

    @PrePersist
    public void prePersist() {
      if (this.userInfo == null) {
        UserInfo defaultInfo = new UserInfo();
        defaultInfo.setFirstName("Firstname");
        defaultInfo.setLastName("Lastname");
        defaultInfo.setPhoneNumber("000-000-0000");
        defaultInfo.setBirthDate(LocalDate.of(2000,1,1));
        setUserInfo(defaultInfo);
      }
    }
  }
