package com.project.fraudDetection.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.project.fraudDetection.dto.ExplainResponseDTO;
import com.project.fraudDetection.dto.MLRequestDTO;
import com.project.fraudDetection.dto.MLResponseDTO;


@Service
public class FraudMLService {

    private final WebClient webClient;

    public FraudMLService(WebClient webClient) {
        this.webClient = webClient;
    }

    public MLResponseDTO callMLService(MLRequestDTO request) {

        return webClient.post()
                .uri("/predict")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(MLResponseDTO.class)
                .block();  
    }
    public ExplainResponseDTO callExplainService(MLRequestDTO request) {

        return webClient.post()
                .uri("/explain")   
                .bodyValue(request)
                .retrieve()
                .bodyToMono(ExplainResponseDTO.class)
                .block();
    }
}