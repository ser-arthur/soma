/**
 * NexusHR - Institutional Mock Data Store
 * Source of Truth for UKVI Compliance & HRM Framework
 */

export const APP_CONFIG = {
    appName: "NexusHR",
    companyName: "edgebrcks",
    licenceNumber: "12948192X",
    authorisingOfficer: "James Smith",
    keyContact: "Michael Obinna",
    licenceExpiry: "2028-10-12",
    lastAuditDate: "2025-11-20",
};

export const EMPLOYEES = [
    {
        id: "EMP001",
        name: "Alex Johnson",
        role: "Senior Software Engineer",
        email: "alex.j@edgebrcks.com",
        type: "Sponsored",
        visaRoute: "Skilled Worker",
        soc: "2136",
        salary: 48500,
        threshold: 38700,
        status: "Active",
        visaExpiry: "2026-08-12",
        rtwStatus: "Verified",
        rtwExpiry: "2026-08-12",
        niNumber: "QQ123456C",
        joinedDate: "2022-01-15",
        currentAddress: "123 London Rd, London, SE1 7PB",
        emergencyContact: "Maria Johnson (+44 7700 900123)",
    },
    {
        id: "EMP002",
        name: "Sarah Chen",
        role: "Digital Product Manager",
        email: "s.chen@edgebrcks.com",
        type: "Sponsored",
        visaRoute: "Skilled Worker",
        soc: "2424",
        salary: 39500,
        threshold: 38700,
        status: "Critical", // 11-day breach
        visaExpiry: "2026-03-15",
        rtwStatus: "Expired",
        rtwExpiry: "2026-03-15",
        niNumber: "JW987654D",
        joinedDate: "2023-05-10",
        currentAddress: "45 Canary Wharf, London, E14 5AB",
        emergencyContact: "Li Chen (+86 138 0000 0000)",
    },
    {
        id: "EMP003",
        name: "Michael Obinna",
        role: "Compliance Lead",
        email: "m.obinna@edgebrcks.com",
        type: "Settled",
        visaRoute: "N/A",
        soc: "3545",
        salary: 62000,
        threshold: 0,
        status: "Active",
        visaExpiry: "N/A",
        rtwStatus: "Verified",
        rtwExpiry: "N/A",
        niNumber: "PL554433A",
        joinedDate: "2021-11-20",
        currentAddress: "10 High St, Manchester, M1 4BT",
    },
    {
        id: "EMP004",
        name: "Elena Rodriguez",
        role: "UX Design Lead",
        email: "e.rod@edgebrcks.com",
        type: "Sponsored",
        visaRoute: "Global Business Mobility",
        soc: "2137",
        salary: 44000,
        threshold: 38700,
        status: "Active",
        visaExpiry: "2027-11-20",
        rtwStatus: "Verified",
        rtwExpiry: "2027-11-20",
        niNumber: "ZZ112233B",
        joinedDate: "2023-09-01",
        currentAddress: "22 Park Ln, Leeds, LS1 2HL",
    },
    {
        id: "EMP005",
        name: "Liam Wilson",
        role: "Junior Marketing Associate",
        email: "l.wilson@edgebrcks.com",
        type: "Sponsored",
        visaRoute: "Graduate Route",
        soc: "3543",
        salary: 31500,
        threshold: 30960,
        status: "Warning", // Expiry soon
        visaExpiry: "2026-05-30",
        rtwStatus: "Verified",
        rtwExpiry: "2026-05-30",
        niNumber: "BT654321D",
        joinedDate: "2023-07-12",
        currentAddress: "7 Green Ln, Bristol, BS1 5TR",
    },
    {
        id: "EMP006",
        name: "Amara Okafor",
        role: "Data Scientist",
        email: "a.okafor@edgebrcks.com",
        type: "Sponsored",
        visaRoute: "Skilled Worker",
        soc: "2135",
        salary: 55000,
        threshold: 38700,
        status: "Active",
        visaExpiry: "2028-02-15",
        rtwStatus: "Verified",
        rtwExpiry: "2028-02-15",
        niNumber: "NX443322A",
        joinedDate: "2024-01-05",
        currentAddress: "15 Thames St, London, EC1R 4RE",
    }
];

export const ABSENCE_LOGS = [
    {
        id: "ABS101",
        empId: "EMP002",
        type: "Unauthorised",
        startDate: "2025-12-01",
        endDate: "2025-12-12",
        days: 11,
        status: "BREACH",
        note: "No contact established since Dec 1st. Automated breach protocol engaged. Home Office report pending."
    },
    {
        id: "ABS102",
        empId: "EMP001",
        type: "Annual Leave",
        startDate: "2025-11-10",
        endDate: "2025-11-12",
        days: 2,
        status: "Approved",
        note: "Approved by AO via self-service portal."
    },
    {
        id: "ABS103",
        empId: "EMP004",
        type: "Sickness",
        startDate: "2025-10-05",
        endDate: "2025-10-09",
        days: 4,
        status: "Approved",
        note: "Medical certificate verified."
    }
];

export const AUDIT_VAULT = [
    // PERSONNEL: EMP001 (Alex Johnson)
    { id: "DOC-001", category: "Identity", title: "Passport Scan - A. Johnson", empId: "EMP001", date: "2022-01-15", status: "Compliant", fileType: "PDF" },
    { id: "DOC-002", category: "RTW", title: "Home Office Share Code Result", empId: "EMP001", date: "2022-01-15", status: "Compliant", fileType: "PDF" },
    { id: "DOC-003", category: "Recruitment", title: "Interview Notes - Senior Engineer", empId: "EMP001", date: "2021-12-10", status: "Compliant", fileType: "PDF" },
    { id: "DOC-004", category: "Payroll", title: "P60 Year End - 2023", empId: "EMP001", date: "2024-04-05", status: "Compliant", fileType: "PDF" },

    // PERSONNEL: EMP002 (Sarah Chen)
    { id: "DOC-005", category: "Identity", title: "BRP Front/Back - S. Chen", empId: "EMP002", date: "2023-05-10", status: "Compliant", fileType: "JPG" },
    { id: "DOC-006", category: "RTW", title: "Manual Passport Verification", empId: "EMP002", date: "2023-05-10", status: "Expired", fileType: "PDF" },
    { id: "DOC-007", category: "Compliance", title: "SMS Report #SR-102 (Absence)", empId: "EMP002", date: "2024-03-13", status: "Filed", fileType: "PDF" },

    // PERSONNEL: EMP004 (Elena Rodriguez)
    { id: "DOC-008", category: "Recruitment", title: "LinkedIn Job Ad - UX Lead", empId: "EMP004", date: "2023-08-01", status: "Compliant", fileType: "PDF" },
    { id: "DOC-009", category: "Payroll", title: "Contract of Employment - Signed", empId: "EMP004", date: "2023-09-01", status: "Compliant", fileType: "PDF" },

    // PERSONNEL: EMP005 (Liam Wilson)
    { id: "DOC-010", category: "Identity", title: "Passport - L. Wilson", empId: "EMP005", date: "2023-07-12", status: "Compliant", fileType: "JPG" },
    { id: "DOC-011", category: "Compliance", title: "CoS Allocation Confirmation", empId: "EMP005", date: "2023-06-30", status: "Compliant", fileType: "PDF" },
    { id: "DOC-012", category: "RTW", title: "Graduate Visa Verification", empId: "EMP005", date: "2023-07-12", status: "Compliant", fileType: "PDF" }
];

export const PAYROLL_HISTORY = [
    { id: "P25-12-01", empId: "EMP001", month: "December 2025", gross: 4041, net: 3120, status: "Paid", payDate: "2025-12-28" },
    { id: "P25-12-02", empId: "EMP002", month: "December 2025", gross: 3291, net: 2540, status: "Paid", payDate: "2025-12-28" }
];

export const PAYSLIPS = [
    { id: 1, month: 'December 2025', gross: 4041, net: 3120, date: '2025-12-28', status: 'Paid' },
    { id: 2, month: 'November 2025', gross: 4041, net: 3120, date: '2025-11-28', status: 'Paid' },
];

export const SMS_SYSTEM_USERS = [
    { id: 1, name: "James Smith", role: "Authorising Officer", smsLevel: "Level 1 User", status: "Active" },
    { id: 2, name: "Michael Obinna", role: "Key Contact", smsLevel: "Level 1 User", status: "Active" },
    { id: 3, name: "Sarah Chen", role: "HR Administrator", smsLevel: "Level 2 User", status: "Suspended" }
];

export const SYSTEM_SETTINGS = {
    notificationRules: {
        visaExpiryDays: [90, 60, 30, 7],
        unauthorisedAbsenceThreshold: 10,
        salaryThresholdAlertMargin: 1000,
    }
};