import { Component } from '@angular/core';
import { User } from './user';
import { TodoItem } from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TodoList';
  user = new User('', '');
  categories = ['General', 'Shopping', 'Work', 'School', 'Well-being', 'Long-term goal'];
  todos = [];
  completed = [];

  onNewTodo(newTodo: TodoItem): void {
    this.todos.push(newTodo);
    console.log(this.todos);
  }
}
