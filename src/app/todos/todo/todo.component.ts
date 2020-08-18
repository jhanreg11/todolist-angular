import { Component, Input, OnInit } from '@angular/core';
import { TodoItem } from '../../todo-item';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  @Input() item: TodoItem;
  @Input() checkboxClickEvent: (item: TodoItem) => void;
  animationState = 'center';

  ngOnInit(): void {
  }

}
