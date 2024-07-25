// store.js
import create from 'zustand';

const useStore = create((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  editTask: (updatedTask) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    ),
  })),
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id),
  })),
  toggleTaskStatus: (id) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ),
  })),
}));

export default useStore;
