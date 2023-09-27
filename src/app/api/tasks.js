import axios from 'axios'
import { headers } from '../../../next.config'

export const tasksAPI = axios.create({
  baseURL: 'http://localhost:8000/tasks/api/tasks/',
})

export const getAllTasks = () => tasksAPI.get('/')
export const createTask = task => tasksAPI.post ('/', task)
export const deleteTask = id => tasksAPI.delete(`/${id}`)
export const editTask = (id, task) => tasksAPI.put(`/${id}`, task)



