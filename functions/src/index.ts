const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { logger } = require("firebase-functions/v2");
const admin = require("firebase-admin");


admin.initializeApp();

exports.sendPushNotification = onCall(async (message: any, context: any) => {
    try {
        const response = await admin.messaging().send(message.data);
        return { success: true, messageId: response };
    } catch (error: any) {
        logger.error(`Error sending notification: ${error?.message || JSON.stringify(error)}`);
        throw new HttpsError('unknown', 'Failed to send push notification', error?.message || error);
    }
});