import { Component } from '@angular/core';
import { User } from './user';
import { TodoItem } from './todo-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TodoList';
  user = new User('', '');
  categories = ['General', 'Shopping', 'Work', 'School', 'Well-being', 'Long-term goal'];
  todos = [new TodoItem('This is a test of a very long sentence. I am currently preparing for a new job that I am very excited about.' +
    ' I am currently preparing for a new job that I am very excited about. I am currently preparing for a new job that I am very excited about. I am currently preparing for a new job that I am very excited about.', 'School', new Date(), new Date(), false), new TodoItem('test', 'School', new Date(), new Date(), false)];

  onNewTodo(newTodo: TodoItem): void {
    this.todos.push(newTodo);
    console.log(this.todos);
  }
}
