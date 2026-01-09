/**
 * NEXUS HR - Compliance Intelligence Service
 * Automates UKVI monitoring and reporting triggers.
 */

import { EMPLOYEES, ABSENCE_LOGS } from './mockData';

export const ComplianceService = {
    /**
     * Checks for unauthorized absences exceeding the 10-day Home Office threshold.
     */
    getAbsenceBreaches: () => {
        return ABSENCE_LOGS.filter(log =>
            log.type === 'Unauthorised' && log.days >= 10
        ).map(log => ({
            ...log,
            employee: EMPLOYEES.find(e => e.id === log.empId),
            deadline: "10 working days from breach"
        }));
    },

    /**
     * Identifies visas expiring within the critical 90-day window.
     */
    getUpcomingExpiries: (days = 90) => {
        const today = new Date();
        const limit = new Date();
        limit.setDate(today.getDate() + days);

        return EMPLOYEES.filter(emp => {
            if (emp.visaExpiry === 'N/A') return false;
            const expiry = new Date(emp.visaExpiry);
            return expiry <= limit && expiry >= today;
        });
    },

    /**
     * Validates if the actual salary paid via payroll matches the SOC threshold.
     */
    validateSalaryAlignment: (empId) => {
        const emp = EMPLOYEES.find(e => e.id === empId);
        if (!emp || emp.type !== 'Sponsored') return null;

        const margin = emp.salary - emp.threshold;
        return {
            isCompliant: margin >= 0,
            margin: margin,
            riskLevel: margin < 1000 ? 'HIGH' : 'STABLE'
        };
    },

    /**
     * Generates a pre-filled SMS report draft for Home Office submission.
     */
    generateSMSDraft: (breach) => {
        return `NEXUS-UKVI-REPORT: ${breach.employee.name} (${breach.employee.id}). 
        EVENT: Unauthorised absence exceeding 10 days. 
        START: ${breach.startDate}. END: ${breach.endDate}. 
        ACTION: Sponsorship review required.`;
    }
};