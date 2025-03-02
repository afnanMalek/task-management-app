import { Request, Response } from "express";
// import Task from "../models/task.model";
import Task from "../models/Task";

// Get all tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    // console.log("Into The API Call >")
    const tasks = await Task.find();
    // console.log("Task in Api >>",tasks);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const taskPayload = req.body;
    const newTask = new Task(taskPayload);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a task
export const updateTask = async (req: Request, res: Response) => {
  try {

    console.log(req.params.id, req.body);
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
