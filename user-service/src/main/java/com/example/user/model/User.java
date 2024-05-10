package com.example.user.model;

import lombok.*;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import javax.persistence.Entity;
import javax.persistence.Id;

@Builder
@Data
@Table("user")
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @Column("id")
    private Long id;
    @Column("login")
    private String login;
    @Column("password")
    private String password;
    @Column("mail")
    private String mail;
    @Column("age")
    private Integer age;
    @Column("sex")
    private SexType sex;
    @Column("height")
    private Float height;
    @Column("weight")
    private Float weight;
    @Column("role_name")
    private String roleName;
}
