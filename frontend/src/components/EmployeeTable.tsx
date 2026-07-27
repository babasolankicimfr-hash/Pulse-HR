import type { Employee } from '../hooks/useEmployees';
import { Edit2, Trash2 } from 'lucide-react';

interface EmployeeTableProps {
    employees: Employee[];
    onEdit: (employee: Employee) => void;
    onDelete: (id: string) => void;
}

export const EmployeeTable = ({ employees, onEdit, onDelete }: EmployeeTableProps) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 bg-slate-50 uppercase font-medium">
                        <tr>
                            <th className="px-6 py-4">Employee</th>
                            <th className="px-6 py-4">Department</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Salary</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {employees.map((emp) => (
                            <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <img src={emp.avatarUrl} alt="" className="w-8 h-8 rounded-full" />
                                        <div>
                                            <div className="font-medium text-slate-900">{emp.firstName} {emp.lastName}</div>
                                            <div className="text-xs text-slate-500">{emp.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-700">{emp.department}</td>
                                <td className="px-6 py-4 text-slate-700">{emp.designation}</td>
                                <td className="px-6 py-4 text-slate-700">${emp.salary.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium
                                        ${emp.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 
                                          emp.status === 'ON_LEAVE' ? 'bg-amber-100 text-amber-700' : 
                                          'bg-slate-100 text-slate-700'}`}>
                                        {emp.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button onClick={() => onEdit(emp)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => onDelete(emp.id)} className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {employees.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                    No employees found. Add one to get started!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
