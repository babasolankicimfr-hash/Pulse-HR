import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Employee } from '../hooks/useEmployees';
import { motion, AnimatePresence } from 'framer-motion';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Partial<Employee>) => void;
    employee?: Employee | null;
}

export const EmployeeDrawer = ({ isOpen, onClose, onSave, employee }: DrawerProps) => {
    const [formData, setFormData] = useState<Partial<Employee>>({
        firstName: '', lastName: '', email: '', department: 'ENGINEERING', designation: '', salary: 0, status: 'ACTIVE'
    });

    useEffect(() => {
        if (employee) {
            setFormData(employee);
        } else {
            setFormData({ firstName: '', lastName: '', email: '', department: 'ENGINEERING', designation: '', salary: 0, status: 'ACTIVE' });
        }
    }, [employee, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} onClick={onClose}
                        className="fixed inset-0 bg-slate-900 z-40" />
                    
                    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto">
                        
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-50">
                            <h2 className="text-xl font-semibold">{employee ? 'Edit Employee' : 'Add Employee'}</h2>
                            <button type="button" onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5" /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">First Name</label>
                                    <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Last Name</label>
                                    <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                                </div>
                            </div>
                            
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Email</label>
                                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Department</label>
                                <select value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                                    <option value="ENGINEERING">Engineering</option>
                                    <option value="PRODUCT">Product</option>
                                    <option value="HR">HR</option>
                                    <option value="SALES">Sales</option>
                                    <option value="MARKETING">Marketing</option>
                                    <option value="FINANCE">Finance</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Role / Designation</label>
                                <input required type="text" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Salary</label>
                                <input required type="number" value={formData.salary} onChange={e => setFormData({...formData, salary: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Status</label>
                                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                                    <option value="ACTIVE">Active</option>
                                    <option value="ON_LEAVE">On Leave</option>
                                    <option value="INACTIVE">Inactive</option>
                                    <option value="TERMINATED">Terminated</option>
                                </select>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3 mt-8">
                                <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors">Save Employee</button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
