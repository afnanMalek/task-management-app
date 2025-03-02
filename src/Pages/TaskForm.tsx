import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AuthServices from "../API/AuthServices";
import InputField from "../Common/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../Zod/validationSchema";
import { statusMapping, showSuccessToast, showErrorToast } from "../utils/Storage";

type TaskStatus = "pending" | "in-progress" | "completed";


interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

interface AIDescriptionResponse {
  description: string;
}


const TaskForm = ({ task, closeForm, onTaskUpdate }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "pending",
      statusId: task?.statusId || statusMapping["pending"].id,
    },
  });

  const status = watch("status");
  const title = watch("title");
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    reset({
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || "pending",
      // statusId: statusMapping[task?.status || "pending"].id,
      statusId: statusMapping[(task?.status as TaskStatus) || "pending"].id,

    });
  }, [task, reset]);

  useEffect(() => {
    reset((prevValues) => ({
      ...prevValues,
      statusId: statusMapping[status as TaskStatus]?.id || prevValues.statusId,
    }));
  }, [status, reset]);

  const onSubmit = async (formData: any) => {
    try {
      const statusId = statusMapping[formData.status as TaskStatus].id;
      const updatedFormData = { ...formData, statusId };

      let response;
      if (task?._id) {
        response = await AuthServices.UpdateTask({ ...updatedFormData, _id: task._id });
      } else {
        response = await AuthServices.createTask(updatedFormData);
      }

      if (response?.success) {
        showSuccessToast(response.message || "Task saved successfully!");
        onTaskUpdate(response.data);
      } else {
        showErrorToast(response.message || "Something went wrong!");
      }
      closeForm();
    } catch (error) {
      console.error("Error submitting task:", error);
      showErrorToast("Failed to submit task!");
    }
  };

  const handleGenerateAIDescription = async () => {
    if (!title.trim()) {
      showErrorToast("Please enter a title before generating a description.");
      return;
    }
  
    setLoadingAI(true);
    try {
      const aiDescription: AIDescriptionResponse = await AuthServices.getAIDescription(title);
      console.log(aiDescription)
      if (aiDescription.description) {
        setValue("description", aiDescription.description);
        showSuccessToast("AI-generated description added.");
      } else {
        showErrorToast("Failed to generate AI description.");
      }
    } catch (error) {
      console.error("Error fetching AI description:", error);
      showErrorToast("Error fetching AI description!");
    }
    setLoadingAI(false);
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-semibold text-white mb-4">
          {task ? "Edit Task" : "Add Task"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField 
            label="Title" 
            name="title" 
            placeholder="Enter task title" 
            register={register} 
            errors={errors} 
          />
          <div>
            <label className="block text-sm font-medium text-gray-300">Description</label>
            <textarea
              {...register("description")}
              className="w-full mt-1 p-2 border rounded-lg bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task description"
              rows={4}
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleGenerateAIDescription}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center"
            disabled={loadingAI}
          >
            {loadingAI ? "Generating..." : "Generate AI Description"}
          </button>
          <div>
            <label className="block text-sm font-medium text-gray-300">Status</label>
            <select
              {...register("status")}
              className="w-full mt-1 p-2 border rounded-lg bg-gray-700 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(statusMapping).map(([key, value]) => (
                <option key={key} value={key} className="text-white bg-gray-800">
                  {value.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button 
              type="button" 
              onClick={closeForm} 
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;