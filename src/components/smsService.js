/**
 * Automated SMS Reporting Logic
 * Handles notifications to management via a mock SMS gateway.
 */

const MOCK_MANAGER_PHONE = "+15550199";

/**
 * Sends an automated SMS report when a leave is requested.
 * @param {Object} leaveData - The details of the leave request.
 */
export const sendLeaveReportSMS = async (leaveData) => {
    console.log(`[SMS Gateway] Preparing notification for manager at ${MOCK_MANAGER_PHONE}...`);

    const message = `HR ALERT: ${leaveData.employeeName} applied for ${leaveData.type} from ${leaveData.startDate} to ${leaveData.endDate}. Reason: ${leaveData.reason.substring(0, 50)}...`;

    try {
        // In a real implementation, this would call an API like Twilio or Vonage
        await new Promise(resolve => setTimeout(resolve, 800));

        console.log(`[SMS Gateway] SUCCESS: "${message}" sent to ${MOCK_MANAGER_PHONE}`);
        return true;
    } catch (error) {
        console.error("[SMS Gateway] ERROR: Failed to send automated report.", error);
        return false;
    }
};