import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { statusMapping } from "../utils/Storage";

interface PieChartComponentProps {
  tasks: any[];
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
  const data = Object.keys(statusCounts)
    .map((status) => ({
      name: statusMapping[status].label,
      value: totalTasks > 0 ? (statusCounts[status] / totalTasks) * 100 : 0, // Percentage
    }))
    .filter((item) => item.value > 0); // Remove zero-value entries

  const COLORS = ["#EF4444", "#FACC15", "#22C55E"]; // Red, Yellow, Green

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-center text-xl font-semibold text-gray-200 mb-4">Task Status Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={({ name, percent }) =>
              percent > 0 ? ` ${(percent * 100).toFixed(1)}%` : ""
            } // Show percentage in labels only if value > 0
            style={{ fontSize: "14px", fontWeight: "bold" }} // Increase font size
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;

