import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import AuthServices from "../API/AuthServices";
import { statusMapping } from "../utils/Storage";
import PieChartComponent from "../Component/PieChartComponent";

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
        setTasks(response);
        setFilteredTasks(response);
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
      await AuthServices.deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleTaskUpdate = (updatedTask: any) => {
    setTasks((prevTasks) => {
      const existingTaskIndex = prevTasks.findIndex(
        (task) => task._id === updatedTask._id
      );

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
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left: Task List */}
        <div className="w-full lg:w-3/5">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-200">
              Task Management
            </h1>

            {/* Filter Dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700"
            >
              <option value="">All</option>
              {Object.entries(statusMapping).map(([key, value]: any) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>
          </div>

          {/* Task List */}
          <div className="space-y-6">
            {filteredTasks.length === 0 ? (
              <p className="text-gray-400 text-center">No tasks found.</p>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task._id}
                  className="p-5 bg-gray-800 shadow-lg rounded-lg flex justify-between items-center border border-gray-700 transition-all"
                >
                  <div className="min-w-[250px] max-w-[350px]">
                    <h3 className="text-xl font-semibold text-white">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-400">{task.description}</p>
                    <p className="text-sm text-gray-400 inline">Status : </p>
                    <p
                      className={`text-xs font-semibold mt-1 inline ${
                        task.status === "pending"
                          ? "text-red-400"
                          : task.status === "in-progress"
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {statusMapping[task.status].label}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setEditTask(task);
                        setShowForm(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105 min-h-[40px] max-h-[50px] flex items-center justify-center"
                    >
                      ✏ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105 min-h-[40px] max-h-[50px] flex items-center justify-center"
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
          {/* Add Task Button aligned with first card */}
          <div className="w-full">
            <button
              onClick={() => {
                setEditTask(null);
                setShowForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105 w-full mb-6"
            >
              ➕ Add Task
            </button>
          </div>

          {/* Pie Chart Section */}
          {tasks.length > 0 && (
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
              <PieChartComponent tasks={tasks} />
            </div>
          )}
        </div>
      </div>

      {/* Task Form Modal */}
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
