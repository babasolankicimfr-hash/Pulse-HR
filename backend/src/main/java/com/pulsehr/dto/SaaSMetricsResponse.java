package com.pulsehr.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SaaSMetricsResponse {
    private long totalHeadcount;
    private long activeCount;
    private long onLeaveCount;
    private long terminatedCount;
    private BigDecimal totalMonthlyPayroll;
    private Map<String, BigDecimal> departmentSalaryDistribution;
}
