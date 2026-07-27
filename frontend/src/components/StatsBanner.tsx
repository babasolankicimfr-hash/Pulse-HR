import { Users, UserCheck, UserMinus, DollarSign } from 'lucide-react';
import type { SaaSMetricsResponse } from '../hooks/useWebSocket';

export const StatsBanner = ({ metrics }: { metrics: SaaSMetricsResponse | null }) => {
    if (!metrics) return null;

    const stats = [
        { title: 'Total Headcount', value: metrics.totalHeadcount, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { title: 'Active Employees', value: metrics.activeCount, icon: UserCheck, color: 'text-green-600', bg: 'bg-green-50' },
        { title: 'On Leave', value: metrics.onLeaveCount, icon: UserMinus, color: 'text-amber-600', bg: 'bg-amber-50' },
        { title: 'Monthly Payroll', value: `$${metrics.totalMonthlyPayroll?.toLocaleString() ?? 0}`, icon: DollarSign, color: 'text-indigo-600', bg: 'bg-indigo-50' }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${stat.bg}`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">{stat.title}</p>
                        <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};
