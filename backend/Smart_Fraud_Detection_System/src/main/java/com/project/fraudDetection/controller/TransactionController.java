package com.project.fraudDetection.controller;
import org.springframework.web.bind.annotation.*;

import com.project.fraudDetection.dto.ExplainResponseDTO;
import com.project.fraudDetection.dto.MLRequestDTO;
import com.project.fraudDetection.dto.MLResponseDTO;
import com.project.fraudDetection.dto.TransactionEventDTO;
import com.project.fraudDetection.entity.Transaction;
import com.project.fraudDetection.service.FraudMLService;
import com.project.fraudDetection.service.TransactionService;

@CrossOrigin(origins = "http://localhost:5713")
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    private final FraudMLService fraudMLservice;

    public TransactionController(TransactionService transactionService,
    		FraudMLService fraudMLservice) {
        this.transactionService = transactionService;
        this.fraudMLservice=fraudMLservice;
      
    }

    @PostMapping
    public TransactionEventDTO createTransaction(@RequestBody MLRequestDTO dto) {
        return transactionService.processTransaction(dto);
    }
    @PostMapping("/explain")
    public ExplainResponseDTO explainTransaction(@RequestBody MLRequestDTO request) {
        return fraudMLservice.callExplainService(request);
    }
}
