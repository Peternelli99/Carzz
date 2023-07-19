package br.com.carzz.carros.entities;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Entity
@Table(name = "vendedor")
@Data
public class Vendedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_concessionaria", referencedColumnName = "id")
    private Concessionaria concessionaria;

    @Column(name = "nome")
    private String nome;

    @Column(name = "salario")
    private int salario;

    @Column(name = "dt_nasc")
    @DateTimeFormat(pattern="yyyy-MM-dd")
    private Date dataNasc;

}
