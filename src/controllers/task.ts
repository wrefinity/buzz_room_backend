import { Request, Response } from 'express';
import { taskService } from '../services/task.services';
import { ITask } from '../models/task';
import { validateTask, validateTaskUpdate } from '../validations/schemas/task.schema';


class TaskRepo {
    createTask = async (req: Request, res: Response) => {
        const { error } = validateTask(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
    
        const taskData: ITask = req.body;
        try {
            const task = await taskService.createTask(taskData);
            return res.status(201).json(task);
        } catch (err) {
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
    getTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await taskService.getTasks();
            return res.status(200).json(tasks);
        } catch (err) {
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
    getTaskById = async (req: Request, res: Response) => {
        try {
            const task = await taskService.getTaskById(req.params.id);
            if (!task) return res.status(404).json({ message: 'Task not found' });
            return res.status(200).json(task);
        } catch (err) {
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
    updateTask = async (req: Request, res: Response) => {
        const { error } = validateTaskUpdate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
    
        try {
            const updatedTask = await taskService.updateTask(req.params.id, req.body);
            if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
            return res.status(200).json(updatedTask);
        } catch (err) {
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
    deleteTask = async (req: Request, res: Response) => {
        try {
            const deletedTask = await taskService.deleteTask(req.params.id);
            if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
            return res.status(200).json({ message: 'Task deleted successfully' });
        } catch (err) {
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
}

export default new TaskRepo()