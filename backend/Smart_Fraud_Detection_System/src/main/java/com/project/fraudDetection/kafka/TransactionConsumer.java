package com.project.fraudDetection.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.fraudDetection.dto.MLRequestDTO;
import com.project.fraudDetection.service.TransactionService;

@Service
public class TransactionConsumer {

    private final TransactionService transactionService;
    private final ObjectMapper objectMapper;

    public TransactionConsumer(TransactionService transactionService,
                               ObjectMapper objectMapper) {

        this.transactionService = transactionService;
        this.objectMapper = objectMapper;
    }

    @KafkaListener(
        topics = "transactions-topic",
        groupId = "fraud-group"
    )
    public void consume(String message) {

        try {

            MLRequestDTO dto =
                    objectMapper.readValue(
                            message,
                            MLRequestDTO.class
                    );

            transactionService.processTransaction(dto);

        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}