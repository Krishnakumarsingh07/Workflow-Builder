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



<img width="1913" height="916" alt="gp1" src="https://github.com/user-attachments/assets/af23ca0c-f5d6-4adb-8bc4-01ff3dbe0462" />


<img width="1912" height="967" alt="p2" src="https://github.com/user-attachments/assets/ba91ae97-8cb1-4d5b-8779-decaae1a96cd" />


<img width="1905" height="970" alt="p3" src="https://github.com/user-attachments/assets/25a1b6cd-1453-4482-9c12-593500d60ed7" />


