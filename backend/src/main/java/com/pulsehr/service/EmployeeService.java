package com.pulsehr.service;

import com.pulsehr.dto.EmployeeCreateRequest;
import com.pulsehr.dto.EmployeeResponse;
import com.pulsehr.dto.SaaSMetricsResponse;

import java.util.List;
import java.util.UUID;

public interface EmployeeService {
    EmployeeResponse createEmployee(String tenantId, EmployeeCreateRequest request);
    EmployeeResponse updateEmployee(String tenantId, UUID employeeId, EmployeeCreateRequest request);
    void deleteEmployee(String tenantId, UUID employeeId);
    EmployeeResponse getEmployee(String tenantId, UUID employeeId);
    List<EmployeeResponse> getAllEmployees(String tenantId);
    SaaSMetricsResponse getMetrics(String tenantId);
}
