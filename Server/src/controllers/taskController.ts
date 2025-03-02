import { Request, Response } from "express";
import Task from "../models/Task";

// Utility function for sending error responses
const handleError = (res: Response, statusCode: number, message: string, error?: any) => {
  console.error(error); // Log error for debugging
  return res.status(statusCode).json({ success: false, statusCode, message, error: error?.message || null });
};

// Get all tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json({ success: true, statusCode: 200, data: tasks });
  } catch (error) {
    return handleError(res, 500, "Failed to fetch tasks", error);
  }
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const taskPayload = req.body;
    if (!taskPayload.title) {
      return handleError(res, 400, "Task title is required");
    }

    const newTask = new Task(taskPayload);
    await newTask.save();

    res.status(201).json({ success: true, statusCode: 201, message: "Task created successfully", data: newTask });
  } catch (error) {
    return handleError(res, 500, "Failed to create task", error);
  }
};

// Update a task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return handleError(res, 400, "Task ID is required");
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedTask) {
      return handleError(res, 404, "Task not found");
    }

    res.json({ success: true, statusCode: 200, message: "Task updated successfully", data: updatedTask });
  } catch (error) {
    return handleError(res, 500, "Failed to update task", error);
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return handleError(res, 400, "Task ID is required");
    }

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return handleError(res, 404, "Task not found");
    }

    res.json({ success: true, statusCode: 200, message: "Task deleted successfully" });
  } catch (error) {
    return handleError(res, 500, "Failed to delete task", error);
  }
};
