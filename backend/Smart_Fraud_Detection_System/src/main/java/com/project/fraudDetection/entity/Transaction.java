package com.project.fraudDetection.entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ML Input Fields
    private String type;

    private double amount;

    private double oldbalanceOrg;

    private double newbalanceOrig;

    private double oldbalanceDest;

    private double newbalanceDest;

    // ML Output Fields
    private Boolean isFraud;

    private Double riskScore;

    // Metadata
    private LocalDateTime timestamp;
}
