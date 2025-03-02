import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { statusMapping } from "../utils/Storage";

interface Task {
  status: "pending" | "in-progress" | "completed";
}

interface PieChartComponentProps {
  tasks: Task[];
}


const PieChartComponent: React.FC<PieChartComponentProps> = ({ tasks }) => {
  const totalTasks = tasks.length;

  // Count tasks based on status
  const statusCounts = tasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    { pending: 0, "in-progress": 0, completed: 0 }
  );

  // Calculate percentages and prepare data for PieChart
  const data = (Object.keys(statusCounts) as (keyof typeof statusMapping)[])
    .map((status) => ({
      name: statusMapping[status]?.label || status, // Ensure label exists
      value: totalTasks > 0 ? (statusCounts[status] / totalTasks) * 100 : 0, // Percentage
    }))
    .filter((item) => item.value > 0); // Remove zero-value entries

  const COLORS = ["#EF4444", "#FACC15", "#22C55E"]; // Red, Yellow, Green

  return (
    <div className="bg-gray-900 p-4 md:p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-center text-lg md:text-xl font-semibold text-gray-200 mb-4">
        Task Status Overview
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80} // Slightly smaller for better fit on mobile
            fill="#8884d8"
            label={({ name, percent }) =>
              percent && typeof percent === "number" ? `${(percent * 100).toFixed(1)}%` : ""
            } // Ensure percent is a number before calling toFixed
            style={{ fontSize: "12px", fontWeight: "bold" }} // Adjust font for better mobile view
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => (typeof value === "number" ? `${value.toFixed(1)}%` : value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
