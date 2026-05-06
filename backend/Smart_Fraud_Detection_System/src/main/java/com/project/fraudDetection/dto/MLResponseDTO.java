package com.project.fraudDetection.dto;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class MLResponseDTO {

    @JsonProperty("ml_score")
    private double mlScore;

    @JsonProperty("rule_score")
    private double ruleScore;

    @JsonProperty("final_score")
    private double finalScore;

    @JsonProperty("fraud")
    private boolean fraud;

    @JsonProperty("decision")
    private String decision;

    @JsonProperty("reasons")
    private List<String> reasons;
}