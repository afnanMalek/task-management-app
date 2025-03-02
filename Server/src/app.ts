import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
import openaiRoutes from "./routes/openaiRoutes";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/openai", openaiRoutes);
export default app;
