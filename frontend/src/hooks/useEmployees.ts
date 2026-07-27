import { useState, useEffect, useCallback } from 'react';

const API_URL = 'http://localhost:8080/api/v1/tenants';

export interface Employee {
    id: string;
    tenantId: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string;
    department: string;
    designation: string;
    salary: number;
    status: string;
    version: number;
}

export const useEmployees = (tenantId: string) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchEmployees = useCallback(async () => {
        if (!tenantId) return;
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/${tenantId}/employees`);
            const data = await res.json();
            setEmployees(data);
        } catch (e) {
            console.error('Failed to fetch employees', e);
        } finally {
            setIsLoading(false);
        }
    }, [tenantId]);

    const fetchMetrics = useCallback(async () => {
        if (!tenantId) return null;
        try {
            const res = await fetch(`${API_URL}/${tenantId}/employees/metrics`);
            return await res.json();
        } catch (e) {
            console.error('Failed to fetch metrics', e);
            return null;
        }
    }, [tenantId]);

    const addEmployee = async (employeeData: Partial<Employee>) => {
        try {
            const res = await fetch(`${API_URL}/${tenantId}/employees`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employeeData)
            });
            if (res.ok) {
                fetchEmployees();
            }
        } catch (e) {
            console.error('Failed to add employee', e);
        }
    };

    const updateEmployee = async (id: string, employeeData: Partial<Employee>) => {
        try {
            const res = await fetch(`${API_URL}/${tenantId}/employees/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(employeeData)
            });
            if (res.ok) {
                fetchEmployees();
            }
        } catch (e) {
            console.error('Failed to update employee', e);
        }
    };

    const deleteEmployee = async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/${tenantId}/employees/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchEmployees();
            }
        } catch (e) {
            console.error('Failed to delete employee', e);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    return { employees, isLoading, fetchEmployees, fetchMetrics, addEmployee, updateEmployee, deleteEmployee };
};
