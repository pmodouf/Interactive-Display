package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor  // Lombok-generated no-args constructor
@AllArgsConstructor // Lombok-generated all-args constructor
@Table(name = "lab")
public class Labb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 250)
    private String title;

    @Column(nullable = false, length = 5000)
    private String info;

    @Column(length = 500)
    private String contact;

}


