import Notification from '../models/notifications';
import { INotification } from '../models/notifications';

class NotificationService {
    /**
     * Create a new notification
     * @param data - Notification data
     * @returns The created notification
     */
    createNotification = async (data: INotification): Promise<INotification> => {
        return await Notification.create(data);
    };

    /**
     * Get all notifications for a user
     * @param userId - ID of the user
     * @returns List of notifications
     */
    getNotificationsByUser = async (userId: string): Promise<INotification[]> => {
        return await Notification.find({ user: userId }).sort({ time: -1 });
    };

    /**
     * Mark a notification as read
     * @param notificationId - ID of the notification
     * @returns The updated notification
     */
    markAsRead = async (notificationId: string): Promise<INotification | null> => {
        return await Notification.findByIdAndUpdate(
            notificationId,
            { isRead: true },
            { new: true }
        );
    };
}

export default new NotificationService();
