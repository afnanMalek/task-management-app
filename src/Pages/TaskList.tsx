import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import AuthServices from "../API/AuthServices";
import { showErrorToast, showSuccessToast, statusMapping } from "../utils/Storage";
import PieChartComponent from "../Component/PieChartComponent";

type TaskStatus = "pending" | "in-progress" | "completed";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState<any>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await AuthServices.getTaskList();

        if (response.success && Array.isArray(response.data)) {
          setTasks(response.data as Task[]);
          setFilteredTasks(response.data as Task[]);
        } else {
          console.error("Error fetching tasks:", response.message);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    if (statusFilter) {
      setFilteredTasks(tasks.filter((task) => task.status === statusFilter));
    } else {
      setFilteredTasks(tasks);
    }
  }, [statusFilter, tasks]);

  const handleDelete = async (id: any) => {
    try {
      const response = await AuthServices.deleteTask(id);
      if (response.success) {
        showSuccessToast(response?.message || "Task deleted successfully!");
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      } else {
        showErrorToast(response?.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleTaskUpdate = (updatedTask: any) => {
    setTasks((prevTasks) => {
      const existingTaskIndex = prevTasks.findIndex((task) => task._id === updatedTask._id);
      if (existingTaskIndex !== -1) {
        const updatedTasks = [...prevTasks];
        updatedTasks[existingTaskIndex] = updatedTask;
        return updatedTasks;
      } else {
        return [...prevTasks, updatedTask];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5 md:p-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-3/5">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-200">Task Management</h1>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 w-full md:w-auto"
            >
              <option value="">All</option>
              {Object.entries(statusMapping).map(([key, value]: any) => (
                <option key={key} value={key}>{value.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-6">
            {filteredTasks.length === 0 ? (
              <p className="text-gray-400 text-center">No tasks found.</p>
            ) : (
              filteredTasks.map((task) => (
                <div key={task._id} className="p-5 bg-gray-800 shadow-lg rounded-lg flex flex-col md:flex-row justify-between items-center border border-gray-700">
                  <div className="w-full md:min-w-[250px] md:max-w-[350px]">
                    <h3 className="text-lg md:text-xl font-semibold text-white">{task.title}</h3>
                    <p className="text-sm text-gray-400">{task.description}</p>
                    <p className="text-sm text-gray-400 inline">Status: </p>
                    <p className={`text-xs font-semibold mt-1 inline ${
                      task.status === "pending" ? "text-red-400" :
                      task.status === "in-progress" ? "text-yellow-400" :
                      "text-green-400"
                    }`}>
                      {statusMapping[task.status as TaskStatus]?.label}
                    </p>
                  </div>
                  <div className="flex gap-2 md:gap-4 mt-4 md:mt-0">
                    <button
                      onClick={() => {
                        setEditTask(task);
                        setShowForm(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105 w-full md:w-auto"
                    >
                      ✏ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105 w-full md:w-auto"
                    >
                      ❌ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="w-full lg:w-2/5 flex flex-col items-center sticky top-10 self-start">
          <button
            onClick={() => {
              setEditTask(null);
              setShowForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105 w-full mb-6"
          >
            ➕ Add Task
          </button>
          {tasks.length > 0 && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
              <PieChartComponent tasks={tasks} />
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <TaskForm
          task={editTask}
          closeForm={() => {
            setEditTask(null);
            setShowForm(false);
          }}
          onTaskUpdate={handleTaskUpdate}
        />
      )}
    </div>
  );
};

export default TaskList;
