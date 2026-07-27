import { useState, useEffect } from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import { useEmployees } from './hooks/useEmployees';
import type { Employee } from './hooks/useEmployees';
import { LiveIndicator } from './components/LiveIndicator';
import { StatsBanner } from './components/StatsBanner';
import { EmployeeTable } from './components/EmployeeTable';
import { EmployeeDrawer } from './components/EmployeeDrawer';
import { Plus } from 'lucide-react';

const TENANT_ID = 'tenant-acme-corp';

function App() {
    const { metrics: wsMetrics, isConnected } = useWebSocket(TENANT_ID);
    const { employees, fetchMetrics, addEmployee, updateEmployee, deleteEmployee } = useEmployees(TENANT_ID);
    
    const [initialMetrics, setInitialMetrics] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    useEffect(() => {
        fetchMetrics().then(m => setInitialMetrics(m));
    }, [fetchMetrics]);

    const displayMetrics = wsMetrics || initialMetrics;

    const handleAdd = () => {
        setEditingEmployee(null);
        setIsDrawerOpen(true);
    };

    const handleEdit = (employee: Employee) => {
        setEditingEmployee(employee);
        setIsDrawerOpen(true);
    };

    const handleSave = (data: Partial<Employee>) => {
        if (editingEmployee) {
            updateEmployee(editingEmployee.id, data);
        } else {
            addEmployee(data);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl leading-none">P</span>
                        </div>
                        <h1 className="text-xl font-bold text-slate-900">PulseHR</h1>
                        <span className="ml-2 px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-xs font-medium border">
                            {TENANT_ID}
                        </span>
                    </div>
                    <LiveIndicator isConnected={isConnected} />
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Team Overview</h2>
                        <p className="text-slate-500 text-sm mt-1">Manage your workforce and track key metrics in real-time.</p>
                    </div>
                    <button onClick={handleAdd} className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors">
                        <Plus className="w-4 h-4" />
                        <span>Add Employee</span>
                    </button>
                </div>

                <StatsBanner metrics={displayMetrics} />
                <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={deleteEmployee} />
            </main>

            <EmployeeDrawer 
                isOpen={isDrawerOpen} 
                onClose={() => setIsDrawerOpen(false)}
                onSave={handleSave}
                employee={editingEmployee}
            />
        </div>
    );
}

export default App;
