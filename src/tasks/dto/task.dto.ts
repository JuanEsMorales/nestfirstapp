import { TaskStatus } from "../task.entity"

export interface CreateTaskDto {
  title: string
  description: string
}

export interface UpdateTaskDto {
  title?: string
  description?: string
  status?: TaskStatus
}