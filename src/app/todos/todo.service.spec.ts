import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { TodoItem } from '../todo-item';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#addNewTodo should add todo to internal todo list', () => {
    const todo = new TodoItem('test todo', 'test', new Date());
    service.addNewTodo(todo).then(() => {
      expect(todo).toBe(service.todos[0]);
    }).catch(() => {
      expect(todo).toBe(null);  // fail test if method fails
    });
  });

  it('#todoEmitter should emit new todo once added to list', () => {
    const todo = new TodoItem('test todo', 'test', new Date());
    let emittedTodo: TodoItem;
    service.todoEmitter.subscribe(t => emittedTodo = t);
    service.addNewTodo(todo).then(() => {
      expect(emittedTodo).toBe(todo);
    });
  });

  it('#getTodos should asynchronously return todo list', () => {
    const todos = [new TodoItem('test todo', 'test', new Date()),
      new TodoItem('test todo', 'test', new Date())];
    let receivedTodos: Array<TodoItem>;

    service.addNewTodo(todos[0]).then(() => {
      service.addNewTodo(todos[1]).then(() => {
        service.getTodos().subscribe(t => {
          receivedTodos = t;
          for (let i = 0; i < todos.length; ++i) {
            expect(todos[i]).toBe(receivedTodos[i]);
          }
        });
      });
    });
  });
});
