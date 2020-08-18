import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistComponent } from './todolist.component';
import { TodoItem } from '../../todo-item';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TodolistComponent', () => {
  let component: TodolistComponent;
  let fixture: ComponentFixture<TodolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodolistComponent ],
      imports: [
        MatChipsModule,
        MatTabsModule,
        MatPaginatorModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#_addNewTodo should add a new todo to list if valid', () => {
    const todo1 = new TodoItem('test todo', 'test', new Date());
    const todo2 = new TodoItem('test todo', 'test2', new Date());
    const todo3 = new TodoItem('test todo', 'test', new Date(), new Date(), true);
    component.showCompleted = false;
    component.selectedCategories = ['test'];

    // @ts-ignore
    component._addNewTodo(todo1);
    // @ts-ignore
    component._addNewTodo(todo2);
    // @ts-ignore
    component._addNewTodo(todo3);

    expect(component.validList.length).toBe(1);
    expect(component.entireList.length).toBe(3);
    expect(component.validList[0]).toBe(todo1);

    component.validList = [];
    component.selectedCategories = [];
    // @ts-ignore
    component._addNewTodo(todo1);
    expect(todo1).toBe(component.validList[0]);
  });

  it('#updateCategories should update valid list and selected categories correctly', () => {
    const todo1 = new TodoItem('test todo', 'test', new Date());
    const todo2 = new TodoItem('test todo', 'test2', new Date());
    const todo3 = new TodoItem('test todo', 'test', new Date(), new Date(), true);
    component.validList = [todo1, todo2];
    component.entireList = [todo1, todo2, todo3];
    component.selectedCategories = [];
    component.showCompleted = false;

    component.updateCategories(true, 'test');
    expect(component.validList.length).toBe(1);
    expect(component.validList[0]).toBe(todo1);
    expect(component.selectedCategories.length).toBe(1);

    component.updateCategories(true, 'test2');
    expect(component.validList.length).toBe(2);
    expect(component.selectedCategories.length).toBe(2);

    component.updateCategories(false, 'test');
    expect(component.validList.length).toBe(1);
    expect(component.validList[0]).toBe(todo2);
    expect(component.selectedCategories[0]).toBe('test2');

    component.updateCategories(false, 'test2');
    expect(component.validList.length).toBe(2);
    expect(component.validList[0]).toBe(todo1);
    expect(component.validList[1]).toBe(todo2);
    expect(component.selectedCategories.length).toBe(0);
  });

  it('#sortTodos should sort the given list using the correct criteria and ordering', () => {
    const todo1 = new TodoItem('todo1', 'test', new Date(1000));
    const todo2 = new TodoItem('todo2', 'test2', new Date(20000));
    const todo3 = new TodoItem('todo3', 'test', new Date(300000), new Date(), true);
    let list = [todo2, todo3, todo1];

    component.orderCriteria = 'dateDue';
    component.reverseOrder = true;
    list = component.sortTodos(list);
    expect(list[0]).toBe(todo1);
    expect(list[1]).toBe(todo2);
    expect(list[2]).toBe(todo3);
  });

  it('#changeCompleted should change valid list to correct items', () => {
    const todo1 = new TodoItem('test todo', 'test', new Date());
    const todo2 = new TodoItem('test todo', 'test2', new Date());
    const todo3 = new TodoItem('test todo', 'test', new Date(), new Date(), true);
    component.entireList = [todo1, todo2, todo3];
    component.validList = [todo1, todo2];

    component.changeCompleted();
    expect(component.validList[0]).toBe(todo3);
  });
});
