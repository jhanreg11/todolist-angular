import { Injectable, EventEmitter } from '@angular/core';
import { TodoItem } from '../todo-item';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoEmitter = new EventEmitter<TodoItem>();
  todos = new Array<TodoItem>();

  async addNewTodo(todo: TodoItem): Promise<TodoItem> {
    // this.todos.push(todo);
    // this.todoEmitter.emit(todo);
    console.log(todo);
    return todo;
  }

  getTodos(): Observable<TodoItem[]> {
    return of(this.todos);
  }
}
