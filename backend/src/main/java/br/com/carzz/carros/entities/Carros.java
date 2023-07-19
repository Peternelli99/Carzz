package br.com.carzz.carros.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "Carros")
@Data
public class Carros {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_concessionaria", referencedColumnName = "id")
    private Concessionaria concessionaria;

    @ManyToOne
    @JoinColumn(name = "id_vendedor", referencedColumnName = "id")
    private Vendedor vendedor;

    @Column(name = "nome")
    private String nome;


}
