/**
 * NEXUS HR - Audit Pack Utility
 * Simulates the generation of an Appendix D compliant audit bundle.
 */

import { EMPLOYEES, ABSENCE_LOGS } from './mockData';

export const AuditPackGenerator = {
    /**
     * Prepares the manifest of files that will be included in the bundle.
     * This proves to the client that we know EXACTLY what the Home Office wants.
     */
    generateManifest: (employeeId) => {
        const emp = EMPLOYEES.find(e => e.id === employeeId);
        if (!emp) return null;

        return {
            bundleId: `AUDIT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            timestamp: new Date().toLocaleString(),
            files: [
                { name: "Appendix_D_Checklist.pdf", status: "Generated" },
                { name: `RTW_Evidence_${emp.name.replace(' ', '_')}.pdf`, status: "Verified" },
                { name: "Contract_of_Employment.pdf", status: "Archived" },
                { name: "Payroll_Alignment_Report.csv", status: "Dynamic" },
                { name: "Historical_Absence_Logs.json", status: "Exported" }
            ],
            complianceNote: "Bundle meets UKVI record-keeping duties for Sponsored Workers."
        };
    },

    /**
     * Simulates the download process for the UI.
     */
    downloadAsJSON: (manifest) => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(manifest, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${manifest.bundleId}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
};