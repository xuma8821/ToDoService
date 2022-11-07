import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoItem } from '../../model/ToDoItem';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-list-todoitem',
  templateUrl: './list-todoitem.component.html',
  styleUrls: ['./list-todoitem.component.scss']
})
export class ListTodoitemComponent implements OnInit {

  public get toDoItems(): ToDoItem[] {
    return this.todoService.todoItems;
  }

  constructor(private todoService: TodoService,private router: Router) {
  }

  ngOnInit(): void {
  }

  public detail(id: number): void {
    this.router.navigate(["/todos",id]);
    this.todoService.selectTodoItem(id);
  }

  public update(id: number): void {
    this.router.navigate(["/todos/edit",id]);
    this.todoService.selectTodoItemForUpdate(id);
  }

  public doDelete(id: number): void {
    this.todoService.delete(id);
  }
}
