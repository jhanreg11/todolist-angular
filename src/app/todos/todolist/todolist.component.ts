import { Component, Input, OnInit } from '@angular/core';
import { TodoItem } from '../../todo-item';
import { TodoService } from '../todo.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
  // animations: [
  //   trigger('checkUncheck', [
  //     state('left', style({
  //       margin: '0 100% 0 -100%'
  //     })),
  //     state('right', style({
  //       margin: '0 -100% 0 100%'
  //     })),
  //     state('center', style({
  //       margin: '0 0 0 0'
  //     })),
  //     transition('left => center', [
  //       animate('500 10')
  //     ]),
  //     transition('right => center', [
  //       animate('500 10')
  //     ]),
  //     transition('center => right', [
  //       animate('500 10')
  //     ]),
  //     transition('center => left', [
  //       animate('500 10')
  //     ]),
  //   ])
  // ]
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

  private _addNewTodo(todo: TodoItem): void {
    this.entireList.push(todo);
    if (this.showCompleted === todo.completed && (this.selectedCategories.includes(todo.category)
      || this.selectedCategories.length === 0)) {
      this.validList.push(todo);
      this.sortTodos(this.validList);
    }
  }

  updateCategories(selected: boolean, catName: string): void {
    const filterFn = (todo: TodoItem) => todo.category === catName && todo.completed === this.showCompleted;
    if (selected) {
      if (this.selectedCategories.length === 0) {
        this.validList = this.entireList.filter(filterFn);
      }
      else {
        const newAdditions = this.entireList.filter(filterFn);
        this.validList = this.sortTodos(this.validList.concat(newAdditions));
      }
      this.selectedCategories.push(catName);
    }
    else {
      if (this.selectedCategories.length === 1) {
        this.validList = this.entireList.filter(item => item.completed === this.showCompleted);
        this.sortTodos(this.validList);
        this.selectedCategories = [];
      }
      else {
        this.validList = this.validList.filter((todo: TodoItem) => todo.category !== catName);
        this.selectedCategories.splice(this.selectedCategories.indexOf(catName), 1);
      }
    }
  }

  sortTodos(todoList: Array<TodoItem>): Array<TodoItem> {
    todoList.sort((a, b) => {
      const diff = a[this.orderCriteria] - b[this.orderCriteria];
      return this.reverseOrder ? diff : -diff;
    });

    return todoList;
  }

  checkboxClick = (item: TodoItem): void => {
    this.validList.splice(this.validList.indexOf(item), 1);
  }

  changeCompleted = (): void => {
    this.showCompleted = !this.showCompleted;
    this.validList = this.entireList.filter(item => item.completed === this.showCompleted && (this.selectedCategories.length === 0
      || this.selectedCategories.includes(item.category)));
    this.sortTodos(this.validList);
  }
}
