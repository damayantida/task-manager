# Task Manager App

This is a simple **Task Management Application** built with **Next.js, TypeScript, Tailwind CSS, and Jotai**. The app allows users to create, edit, delete, and manage tasks using drag-and-drop functionality.

## 🚀 Live Demo
[Click here to view the live demo](https://task-manager-damay.vercel.app/)

---

## 📌 Features
✅ Create a task with **title, description, priority, and progress**  
✅ Edit a task (title, description, priority)  
✅ Delete a task  
✅ Drag and drop to change task status  
✅ Uses **local storage** to persist tasks  
✅ **Jotai for state management**  
✅ **Responsive UI optimized for desktop**  

---

## 🛠 Tech Stack
- **Next.js 15** - React-based framework
- **TypeScript** - Statically typed JavaScript
- **Tailwind CSS** - Utility-first styling
- **Jotai** - Lightweight state management
- **Dnd-Kit** - Drag and drop functionality
- **Local Storage** - Persisting task data

---

## 📂 Folder Structure
```
/src
  ├── components
  │   ├── TaskBoard.tsx  # Main task board component
  │   ├── TaskColumn.tsx  # Columns (To Do, In Progress, Done)
  │   ├── TaskCard.tsx  # Individual task component
  │   ├── TaskForm.tsx  # Form to create/edit tasks
  ├── store
  │   ├── tasks.ts  # Jotai state management for tasks
  ├── app
  │   ├── layout.tsx  # Layout wrapper
  │   ├── page.tsx  # Main page
```

---

## 🔧 Setup Instructions
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/damayantida/task-manager.git
cd task-manager
```
### 2️⃣ Install Dependencies
```sh
npm install
```
### 3️⃣ Run Locally
```sh
npm run dev
```
### 4️⃣ Open in Browser
Visit **`http://localhost:3000`** to see the app in action.

---

## 🏗️ Chosen Approach
### **State Management**
- Used **Jotai** for simple and efficient state handling.
- Avoided Redux/Zustand since Jotai is lightweight and works well for this project.

### **Storage Solution**
- Used **Local Storage** to persist tasks, so they remain after a page refresh.
- No API or database was used as per the requirements.

### **Drag-and-Drop Handling**
- Used **Dnd-Kit** for smooth task movement between columns.
- Each column is a droppable area, and tasks are draggable.

### **UI Components & Styling**
- Built with **Tailwind CSS** for faster styling and responsiveness.
- Focused on **desktop view (1024px min width)** as per requirements.

---

## ⚠️ Known Issues
- None for now! If any issues arise, they will be documented here.

---

## 🌟 Potential Improvements
If given more time, I would:
- Add **task sorting options** (by priority, date, or title).
- Improve **animations** for smoother interactions.
- Add **filters & search functionality**.
- Implement **dark mode** for better accessibility.

