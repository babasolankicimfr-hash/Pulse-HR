package com.pulsehr.repository;

import com.pulsehr.domain.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

    List<Employee> findAllByTenantId(String tenantId);

    @Query("SELECT COUNT(e) FROM Employee e WHERE e.tenantId = :tenantId")
    long countByTenantId(@Param("tenantId") String tenantId);

    @Query("SELECT COUNT(e) FROM Employee e WHERE e.tenantId = :tenantId AND e.status = 'ACTIVE'")
    long countActiveByTenantId(@Param("tenantId") String tenantId);

    @Query("SELECT COUNT(e) FROM Employee e WHERE e.tenantId = :tenantId AND e.status = 'ON_LEAVE'")
    long countOnLeaveByTenantId(@Param("tenantId") String tenantId);

    @Query("SELECT COUNT(e) FROM Employee e WHERE e.tenantId = :tenantId AND e.status = 'TERMINATED'")
    long countTerminatedByTenantId(@Param("tenantId") String tenantId);

    @Query("SELECT COALESCE(SUM(e.salary), 0) FROM Employee e WHERE e.tenantId = :tenantId AND e.status = 'ACTIVE'")
    java.math.BigDecimal sumActiveSalaryByTenantId(@Param("tenantId") String tenantId);

    @Query("SELECT e.department, SUM(e.salary) FROM Employee e WHERE e.tenantId = :tenantId AND e.status = 'ACTIVE' GROUP BY e.department")
    List<Object[]> getDepartmentSalaryDistribution(@Param("tenantId") String tenantId);
}
