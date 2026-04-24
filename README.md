# Workflow Automation Builder by Krishna kumar Singh

# Project Overview

The project provides an intuitive canvas where users can drag different types of nodes (Start, Task, Approval, Automated Step, End), connect them, configure their properties dynamically, and simulate their execution. The architecture follows strict modularity, strong TypeScript typing, and responsive design principles.

# Architecture

The application is split into two parts:

1. **Frontend (React + Vite + TypeScript)**
   - Utilizes **React Flow** for the canvas, offering a smooth drag-and-drop experience.
   - Uses **Redux Toolkit** for robust state management, avoiding prop drilling and keeping the flow state synchronized across components.
   - Designed with a scalable component structure (Canvas, Nodes, Forms, Sidebar, Panels).
   - Features a dynamic Configuration Panel that adapts to the currently selected node type.

2. **Backend (Node.js + Express)**
   - A mock API server that provides dynamic data for automation actions.
   - Simulates workflow execution by traversing the graph (nodes + edges) using Breadth-First Search (BFS) and generating execution logs.

## Setup Instructions

### Prerequisites

- Node.js (v18+)

### 1. Start the Backend Server

cd backend
npm install
npm run dev

The mock API will run on `http://localhost:5000`.

### 2. Start the Frontend

In a new terminal window:

cd frontend
npm install
npm run dev

The application will open on `http://localhost:5173`.
