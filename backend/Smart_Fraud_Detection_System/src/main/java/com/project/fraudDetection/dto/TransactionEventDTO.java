package com.project.fraudDetection.dto;

import lombok.Data;

@Data
public class TransactionEventDTO {

	 private MLRequestDTO transaction;  
	 private MLResponseDTO result; 
}
