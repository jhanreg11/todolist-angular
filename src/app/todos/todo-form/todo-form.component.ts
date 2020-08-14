import { Component, OnInit, Input } from '@angular/core';
import { TodoItem } from '../../todo-item';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  public currTodo = new TodoItem('', '', null, new Date(), false);
  @Input() categories: Array<string>;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  createTodo(): void {
    this.todoService.addNewTodo(this.currTodo);
    this.currTodo = new TodoItem('', '', null, new Date(), false);
  }
}
