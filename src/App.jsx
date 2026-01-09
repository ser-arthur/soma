import React, { useState } from 'react';
import { X } from 'lucide-react';

// Institutional Modules (Admin)
import AdminDashboard from './modules/admin/Dashboard';
import EmployeeDirectory from './modules/admin/EmployeeDirectory';
import AbsenceTracker from './modules/admin/AbsenceTracker';
import AuditVault from './modules/admin/AuditVault';
import PayrollCoS from './modules/admin/PayrollCoS';
import Settings from './modules/admin/SystemSettings.jsx';

// Institutional Modules (Employee)
import EmployeePortal from './modules/employee/EmployeePortal';
import EmployeeProfile from './modules/employee/EmployeeProfile';
import  EmployeeAbsence from './modules/employee/EmployeeAbsence';
import PayrollArchive from './modules/employee/PayrollArchive';
import StatutoryFolder from './modules/employee/StatutoryFolder';
import Handbook from './modules/employee/Handbook.jsx';

// Layout Components
import Sidebar from './components/Sidebar';
import Header from './components/Header';

/**
 * ============================================================================
 * NEXUS HR - MAIN CORE
 * ============================================================================
 */

export default function App() {
    const [viewMode, setViewMode] = useState('Admin'); // 'Admin' or 'Employee'
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const toggleRole = () => {
        const next = viewMode === 'Admin' ? 'Employee' : 'Admin';
        setViewMode(next);
        setSelectedEmployee(null);
        setActiveTab(next === 'Admin' ? 'Dashboard' : 'My Dashboard');
    };

    const renderContent = () => {
        // EMPLOYEE VIEW LOGIC (Exhaustive CRM Sections)
        if (viewMode === 'Employee') {
            switch (activeTab) {
                case 'My Profile': return <EmployeeProfile />;
                case 'Time Off': return <EmployeeAbsence />;
                case 'Payroll Archive': return <PayrollArchive />; // YOUR NEW PAGE
                case 'Statutory Folder': return <StatutoryFolder />;
                case 'Company Handbook': return <Handbook />;
                default: return <EmployeePortal />; // This is "My Dashboard"
            }
        }

        // ADMIN VIEW LOGIC
        if (viewMode === 'Admin') {
            switch (activeTab) {
                case 'Employees': return <EmployeeDirectory />;
                case 'Absence Tracker': return <AbsenceTracker />;
                case 'Audit Records': return <AuditVault />;
                case 'Payroll & Benefits': return <PayrollCoS />;
                case 'System Settings': return <Settings />;
                default: return <AdminDashboard />;
            }
        }
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden">
            <Sidebar
                viewMode={viewMode}
                activeTab={activeTab}
                setActiveTab={(tab) => {
                    setActiveTab(tab);
                    setSelectedEmployee(null);
                }}
                onRoleSwitch={toggleRole}
            />

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative lg:ml-72">
                <Header
                    activeTab={selectedEmployee ? "Compliance Dossier" : activeTab}
                    viewMode={viewMode}
                />

                <div className="flex-1 overflow-y-auto bg-[#F8FAFC] px-12 md:px-16 lg:px-20 py-12">
                    <div className="max-w-[1500px] mx-auto w-full">
                        {renderContent()}
                    </div>
                </div>
            </main>
        </div>
    );
}