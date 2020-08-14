import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {
  categories = ['General', 'Shopping', 'Work', 'School', 'Well-being', 'Long-term goal'];

  ngOnInit(): void {
  }

}
