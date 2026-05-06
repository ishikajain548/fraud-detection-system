package com.project.fraudDetection.dto;

import lombok.Data;

@Data
public class MLRequestDTO {

    private String type;
    private double amount;
    private double oldbalanceOrg;
    private double newbalanceOrig;
    private double oldbalanceDest;
    private double newbalanceDest;
    
}