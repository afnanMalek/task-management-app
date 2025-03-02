import fetchApi from "./FetchAPI";



const AuthServices = {
    getTaskList: async () => {
        const data = await fetchApi("GET", "tasks/");
        console.log("Data>>",data)
        return data;
    },

    createTask: async (taskPayload: any) => {
        // console.log("TaskPatload>>>",taskPayload)
        const data=await fetchApi("POST", "tasks/", taskPayload);
        console.log("API Response >>>>>",data)
        return data;
    },

    UpdateTask:async (updateTaskPayload:any) => {
        // console.log("User payload >>",updateTaskPayload)
        const data=await fetchApi("PATCH", `tasks/${updateTaskPayload._id}`, updateTaskPayload);
        console.log("API Response >>>>>",data)
        return data;
    },

    deleteTask: async (id:any) => {
        console.log("User payload >>",id)
        const data=await fetchApi("DELETE", `tasks/${id}`);
        console.log("API Response >>>>>",data)
        return data;
    },
    getAIDescription:async(title:any)=>{
        console.log("User payload >>",{title})
        const data=await fetchApi("POST", `openai/generate-description`,{title});
        console.log("API Response AI Description>>>>>",data)
        return data;
    }
};

export default AuthServices;
