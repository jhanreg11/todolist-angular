import { Component, Input, OnInit } from '@angular/core';
import { TodoItem } from '../../todo-item';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() item: TodoItem;

  ngOnInit(): void {
  }

}
