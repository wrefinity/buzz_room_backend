import { Request, Response } from 'express';
import notificationService from '../services/notification.services';
import { validateNotification } from '../validations/schemas/notification.schema';
import { CustomRequest } from '../utils/types';

class NotificationController {
    /**
     * Create a notification
     */
    createNotification = async (req: CustomRequest, res: Response): Promise<Response> => {
        const { error, value } = validateNotification(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        try {
            const userId = req.user._id;
            const notification = await notificationService.createNotification({...value, userId});
            return res.status(201).json(notification);
        } catch (err) {
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
    };

    /**
     * Get all notifications for a user
     */
    getNotifications = async (req: CustomRequest, res: Response): Promise<Response> => {
        const { userId } = req.params;

        try {
            const userId = req.user._id;
            const notifications = await notificationService.getNotificationsByUser(userId);
            return res.status(200).json(notifications);
        } catch (err) {
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
    };

    /**
     * Mark a notification as read
     */
    markAsRead = async (req: Request, res: Response): Promise<Response> => {
        const { notificationId } = req.params;

        try {
            const notification = await notificationService.markAsRead(notificationId);

            if (!notification) {
                return res.status(404).json({ message: 'Notification not found' });
            }

            return res.status(200).json(notification);
        } catch (err) {
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
    };
}

export default new NotificationController();
