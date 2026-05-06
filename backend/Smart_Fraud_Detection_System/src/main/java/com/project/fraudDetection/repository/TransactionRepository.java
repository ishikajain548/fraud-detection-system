package com.project.fraudDetection.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.fraudDetection.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}