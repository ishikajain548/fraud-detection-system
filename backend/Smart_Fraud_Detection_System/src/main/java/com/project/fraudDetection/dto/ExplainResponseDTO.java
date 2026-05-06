package com.project.fraudDetection.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ExplainResponseDTO {

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

    @JsonProperty("explanations")
    private Map<String, Double> explanations;


    @JsonProperty("shap_values")
    private List<Double> shapValues;

    @JsonProperty("feature_names")
    private List<String> featureNames;

    @JsonProperty("base_value")
    private double baseValue;
}