import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { v4 } from 'uuid';
import { UpdateTaskDto } from './dto/task.dto';


@Injectable()
export class TasksService {
  private tasks: Task[] = [{
    id: "1",
    title: 'Task 1',
    description: 'Task 1 description',
    status: TaskStatus.PENDING
  }]
  getAllTasks(): Task[] {
    return this.tasks
  } 
  getTask(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id)
  }
  createTask(title: string, description: string) {
    if (typeof title != 'string') return { "statusCode": 400, "message": "title must be a string"}
    if (typeof description != 'string') return { "statusCode": 400, "message": "description must be a string"}
    const task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.PENDING
    }
    this.tasks.push(task)
    return task
  }
  updateTask(id: string, updatedFields: UpdateTaskDto) {
    const task = this.getTask(id)
    if (!task) {
      return {
        "error": "Task not found"
      }
    }
    const newTask = Object.assign(task, updatedFields)
    if (typeof newTask.title != "string") return {"statusCode": 400, message: "title must be a string"}
    if (typeof newTask.description != "string") return {"statusCode": 400, message: "description must be a string"}
    // if status is not in TaskStatus enum, return status code 400 and message "status must be PENDING, IN_PROGRESS or DONE"
    if (!Object.values(TaskStatus).includes(newTask.status)) return {"statusCode": 400, message: "status must be PENDING, IN_PROGRESS or DONE"}  
    this.tasks = this.tasks.map(task => task.id === id ? newTask : task) 
    return newTask
  }
  deleteTask(id: string) {
    this.tasks = this.tasks.filter(task => task.id !== id)
  }
}
