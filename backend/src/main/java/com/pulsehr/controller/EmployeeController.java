package com.pulsehr.controller;

import com.pulsehr.dto.EmployeeCreateRequest;
import com.pulsehr.dto.EmployeeResponse;
import com.pulsehr.dto.SaaSMetricsResponse;
import com.pulsehr.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/tenants/{tenantId}/employees")
@RequiredArgsConstructor
@Tag(name = "Employee Management", description = "Multi-tenant employee operations")
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    @Operation(summary = "Create a new employee")
    public ResponseEntity<EmployeeResponse> createEmployee(
            @PathVariable @Parameter(description = "Tenant ID") String tenantId,
            @Valid @RequestBody EmployeeCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(employeeService.createEmployee(tenantId, request));
    }

    @PutMapping("/{employeeId}")
    @Operation(summary = "Update an existing employee")
    public ResponseEntity<EmployeeResponse> updateEmployee(
            @PathVariable String tenantId,
            @PathVariable UUID employeeId,
            @Valid @RequestBody EmployeeCreateRequest request) {
        return ResponseEntity.ok(employeeService.updateEmployee(tenantId, employeeId, request));
    }

    @DeleteMapping("/{employeeId}")
    @Operation(summary = "Soft delete an employee")
    public ResponseEntity<Void> deleteEmployee(
            @PathVariable String tenantId,
            @PathVariable UUID employeeId) {
        employeeService.deleteEmployee(tenantId, employeeId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{employeeId}")
    @Operation(summary = "Get an employee by ID")
    public ResponseEntity<EmployeeResponse> getEmployee(
            @PathVariable String tenantId,
            @PathVariable UUID employeeId) {
        return ResponseEntity.ok(employeeService.getEmployee(tenantId, employeeId));
    }

    @GetMapping
    @Operation(summary = "List all employees for the tenant")
    public ResponseEntity<List<EmployeeResponse>> getAllEmployees(
            @PathVariable String tenantId) {
        return ResponseEntity.ok(employeeService.getAllEmployees(tenantId));
    }

    @GetMapping("/metrics")
    @Operation(summary = "Get SaaS metrics for the dashboard")
    public ResponseEntity<SaaSMetricsResponse> getMetrics(
            @PathVariable String tenantId) {
        return ResponseEntity.ok(employeeService.getMetrics(tenantId));
    }
}
