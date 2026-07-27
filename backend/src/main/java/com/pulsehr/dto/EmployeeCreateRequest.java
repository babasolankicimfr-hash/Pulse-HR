package com.pulsehr.dto;

import com.pulsehr.domain.enums.Department;
import com.pulsehr.domain.enums.EmployeeStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class EmployeeCreateRequest {
    @NotBlank
    private String firstName;
    
    @NotBlank
    private String lastName;
    
    @NotBlank
    @Email
    private String email;
    
    private String avatarUrl;
    
    @NotNull
    private Department department;
    
    @NotBlank
    private String designation;
    
    @NotNull
    @Positive
    private BigDecimal salary;
    
    @NotNull
    private EmployeeStatus status;
}
