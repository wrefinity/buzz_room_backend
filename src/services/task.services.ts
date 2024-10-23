import Task, { ITask} from '../models/task';

class TaskService {
    createTask = async (taskData: ITask): Promise<ITask> =>{
        const task = new Task(taskData);
        return await task.save();
    }

    getTasks = async (): Promise<ITask[]> => {
        return await Task.find();
    }

    getTaskById = async (taskId: string): Promise<ITask | null> =>{
        return await Task.findById(taskId);
    }

    updateTask = async (taskId: string, taskData: Partial<ITask>): Promise<ITask | null> =>{
        return await Task.findByIdAndUpdate(taskId, taskData, { new: true });
    }

    deleteTask = async (taskId: string): Promise<ITask | null> =>{
        return await Task.findByIdAndDelete(taskId);
    }
}

export const taskService = new TaskService();