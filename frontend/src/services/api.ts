import axios from "axios";
import { Task } from "../types/Task";

const API_URL = "http://localhost:8000/api";

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/tasks/`);
  return response.data;
};

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  const response = await axios.post(`${API_URL}/tasks/`, task);
  return response.data;
};

export const updateTask = async (
  id: number,
  task: Partial<Task>
): Promise<Task> => {
  const response = await axios.patch(`${API_URL}/tasks/${id}/`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/tasks/${id}/`);
};
