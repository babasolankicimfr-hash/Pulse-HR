package com.pulsehr.service;

import com.pulsehr.domain.entity.Employee;
import com.pulsehr.domain.enums.Department;
import com.pulsehr.dto.EmployeeCreateRequest;
import com.pulsehr.dto.EmployeeResponse;
import com.pulsehr.dto.SaaSMetricsResponse;
import com.pulsehr.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository repository;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    @Transactional
    public EmployeeResponse createEmployee(String tenantId, EmployeeCreateRequest request) {
        Employee employee = Employee.builder()
                .tenantId(tenantId)
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .avatarUrl(request.getAvatarUrl() != null ? request.getAvatarUrl() : generateAvatar(request))
                .department(request.getDepartment())
                .designation(request.getDesignation())
                .salary(request.getSalary())
                .status(request.getStatus())
                .build();
        
        Employee saved = repository.save(employee);
        broadcastMetrics(tenantId);
        return mapToResponse(saved);
    }

    @Override
    @Transactional
    public EmployeeResponse updateEmployee(String tenantId, UUID employeeId, EmployeeCreateRequest request) {
        Employee employee = getEmployeeEntity(tenantId, employeeId);
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());
        if (request.getAvatarUrl() != null) employee.setAvatarUrl(request.getAvatarUrl());
        employee.setDepartment(request.getDepartment());
        employee.setDesignation(request.getDesignation());
        employee.setSalary(request.getSalary());
        employee.setStatus(request.getStatus());

        Employee updated = repository.save(employee);
        broadcastMetrics(tenantId);
        return mapToResponse(updated);
    }

    @Override
    @Transactional
    public void deleteEmployee(String tenantId, UUID employeeId) {
        Employee employee = getEmployeeEntity(tenantId, employeeId);
        repository.delete(employee);
        broadcastMetrics(tenantId);
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeResponse getEmployee(String tenantId, UUID employeeId) {
        return mapToResponse(getEmployeeEntity(tenantId, employeeId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<EmployeeResponse> getAllEmployees(String tenantId) {
        return repository.findAllByTenantId(tenantId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public SaaSMetricsResponse getMetrics(String tenantId) {
        long totalHeadcount = repository.countByTenantId(tenantId);
        long activeCount = repository.countActiveByTenantId(tenantId);
        long onLeaveCount = repository.countOnLeaveByTenantId(tenantId);
        long terminatedCount = repository.countTerminatedByTenantId(tenantId);
        BigDecimal totalPayroll = repository.sumActiveSalaryByTenantId(tenantId);
        
        List<Object[]> deptDist = repository.getDepartmentSalaryDistribution(tenantId);
        Map<String, BigDecimal> distMap = new HashMap<>();
        for (Object[] row : deptDist) {
            Department dept = (Department) row[0];
            BigDecimal sum = (BigDecimal) row[1];
            distMap.put(dept.name(), sum);
        }

        return SaaSMetricsResponse.builder()
                .totalHeadcount(totalHeadcount)
                .activeCount(activeCount)
                .onLeaveCount(onLeaveCount)
                .terminatedCount(terminatedCount)
                .totalMonthlyPayroll(totalPayroll != null ? totalPayroll : BigDecimal.ZERO)
                .departmentSalaryDistribution(distMap)
                .build();
    }

    private void broadcastMetrics(String tenantId) {
        SaaSMetricsResponse metrics = getMetrics(tenantId);
        String destination = String.format("/topic/tenant/%s/employee-events", tenantId);
        log.info("Broadcasting metrics to {}", destination);
        messagingTemplate.convertAndSend(destination, metrics);
    }

    private Employee getEmployeeEntity(String tenantId, UUID id) {
        return repository.findById(id)
                .filter(e -> e.getTenantId().equals(tenantId))
                .orElseThrow(() -> new EntityNotFoundException("Employee not found"));
    }

    private EmployeeResponse mapToResponse(Employee e) {
        EmployeeResponse resp = new EmployeeResponse();
        resp.setId(e.getId());
        resp.setTenantId(e.getTenantId());
        resp.setFirstName(e.getFirstName());
        resp.setLastName(e.getLastName());
        resp.setEmail(e.getEmail());
        resp.setAvatarUrl(e.getAvatarUrl());
        resp.setDepartment(e.getDepartment());
        resp.setDesignation(e.getDesignation());
        resp.setSalary(e.getSalary());
        resp.setStatus(e.getStatus());
        resp.setVersion(e.getVersion());
        resp.setCreatedAt(e.getCreatedAt());
        resp.setUpdatedAt(e.getUpdatedAt());
        return resp;
    }
    
    private String generateAvatar(EmployeeCreateRequest req) {
        return "https://ui-avatars.com/api/?name=" + req.getFirstName() + "+" + req.getLastName() + "&background=random";
    }
}
