package com.pulsehr.dto;

import com.pulsehr.domain.enums.Department;
import com.pulsehr.domain.enums.EmployeeStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class EmployeeResponse {
    private UUID id;
    private String tenantId;
    private String firstName;
    private String lastName;
    private String email;
    private String avatarUrl;
    private Department department;
    private String designation;
    private BigDecimal salary;
    private EmployeeStatus status;
    private Long version;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
