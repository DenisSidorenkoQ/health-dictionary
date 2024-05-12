package com.example.user.model;

import lombok.*;

import javax.persistence.*;

@Builder
@Data
@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "login")
    private String login;
    @Column(name = "password")
    private String password;
    @Column(name = "mail")
    private String mail;
    @Column(name = "age")
    private Integer age;
    @Column(name = "sex")
    private String sex;
    @Column(name = "height")
    private Integer height;
    @Column(name = "weight")
    private Integer weight;
    @Column(name = "role_name")
    private String roleName;
    @Column(name = "frequency_physical_activity")
    private String physicalActivity;
    @Column(name = "is_notify")
    private Boolean isNotify;
}
