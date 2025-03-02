# Task Management App

## Overview
This is a **Task Management App** built with TypeScript, featuring:
- **Pie Chart Visualization** using the `recharts` package.
- **AI-powered Task Description Generation** using `@google/generative-ai`.
- **Filtering and Task Management** for better workflow organization.

## Technologies Used
- **Frontend:** React.js, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** (Specify if using MongoDB, MySQL, PostgreSQL, etc.)
- **AI Integration:** Google Generative AI (`@google/generative-ai`)
- **Charting Library:** Recharts

## Why TypeScript?
In live projects, **TypeScript** is preferred over JavaScript due to its:
- **Static Typing:** Helps catch errors during development.
- **Better Code Maintainability:** Makes refactoring easier.
- **Improved Developer Experience:** Provides IntelliSense and autocompletion.

## Installation and Running the Project
### 1️⃣ Clone the Repository

git clone https://github.com/afnanMalek/task-management-app.git
cd task-management-app

### 2️⃣ Install Dependencies

npm install

### 3️⃣ Run the Frontend

npm run dev

### 4️⃣ Run the Backend

cd server
npm run dev

## Features
- **Create, Update, and Delete Tasks**
- **Filter Tasks by Status or Priority**
- **Generate AI-based Task Descriptions**
- **Visualize Task Distribution with Pie Charts**

## Environment Variables (.env)
Make sure to configure the `.env` file correctly before running the project.

```env
# Example Environment Variables
OPENAI_API_KEY=your_api_key_here
DATABASE_URL=your_database_url_here
```



