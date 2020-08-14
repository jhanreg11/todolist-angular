import { Component, Input, OnInit } from '@angular/core';
import { TodoItem } from '../../todo-item';
import { MatChip } from '@angular/material/chips';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  @Input() categories: Array<string>;
  public entireList = new Array<TodoItem>();
  public validList = new Array<TodoItem>();
  public orderCriteria = 'dateDue';
  public reverseOrder = true;
  public showCompleted = false;
  public selectedCategories = new Array<string>();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.todoEmitter.subscribe(todo => this._addNewTodo(todo));
  }

  updateCategories(selected: boolean, catName: string): void {
    console.log(this.entireList);
    if (this.selectedCategories.length === 0) {
      this.validList = this.entireList.filter(todo => todo.category === catName);
    }
    else if (selected) {
      const newAdditions = this.entireList.filter((todo: TodoItem) => todo.category === catName);
      this.validList = this._sortTodos(this.validList.concat(newAdditions));
      this.selectedCategories.push(catName);
    }
    else {
      this.validList = this.validList.filter((todo: TodoItem) => todo.category !== catName);
      this.selectedCategories.filter(cat => cat !== catName);
    }
  }

  _sortTodos(todoList: Array<TodoItem>): Array<TodoItem> {
    console.log('_sortTodos called');
    todoList.sort((a, b) => {
      const diff = a[this.orderCriteria] - b[this.orderCriteria];
      return this.reverseOrder ? diff : -diff;
    });

    return todoList;
  }

  _createValidList(): void {
    this.validList = this.entireList.filter(todo => todo.completed === this.showCompleted
      && this.selectedCategories.includes(todo.category));
    this._sortTodos(this.validList);
  }

  _addNewTodo(todo: TodoItem): void {
    console.log('_addNewTodo called');
    this.entireList.push(todo);
    if (this.selectedCategories.includes(todo.category) || this.selectedCategories.length === 0) {
      this.validList.push(todo);
      this._sortTodos(this.validList);
    }
    console.log(this.validList, this.entireList);
  }
}
