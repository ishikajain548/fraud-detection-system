package com.project.fraudDetection.service;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import com.project.fraudDetection.dto.MLRequestDTO;
import com.project.fraudDetection.dto.MLResponseDTO;
import com.project.fraudDetection.dto.TransactionEventDTO;
import com.project.fraudDetection.entity.Transaction;
import com.project.fraudDetection.repository.TransactionRepository;

import java.time.LocalDateTime;

@Service
public class TransactionService {

    private final FraudMLService fraudMLService;
    private final TransactionRepository transactionRepository;
    private final SimpMessagingTemplate messagingTemplate;
    
    public TransactionService(FraudMLService fraudMLService,
                              TransactionRepository transactionRepository,
                              SimpMessagingTemplate messagingTemplate) {
        this.fraudMLService = fraudMLService;
        this.transactionRepository = transactionRepository;
        this.messagingTemplate=messagingTemplate;
    }

    
    public TransactionEventDTO processTransaction(MLRequestDTO dto) {

        MLResponseDTO mlResponse = fraudMLService.callMLService(dto);

        Transaction transaction = new Transaction();
        transaction.setType(dto.getType());
        transaction.setAmount(dto.getAmount());
        transaction.setOldbalanceOrg(dto.getOldbalanceOrg());
        transaction.setNewbalanceOrig(dto.getNewbalanceOrig());
        transaction.setOldbalanceDest(dto.getOldbalanceDest());
        transaction.setNewbalanceDest(dto.getNewbalanceDest());
        transaction.setTimestamp(LocalDateTime.now());

        transaction.setIsFraud(mlResponse.isFraud());
        transaction.setRiskScore(mlResponse.getFinalScore());

        transactionRepository.save(transaction);

       // messagingTemplate.convertAndSend("/topic/transactions", mlResponse);

        TransactionEventDTO event = new TransactionEventDTO();
        event.setTransaction(dto);     // raw transaction
        event.setResult(mlResponse);   // prediction

        messagingTemplate.convertAndSend("/topic/transactions", event);
        return event;   
    }
}
