import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { ToDoItem } from '../../model/ToDoItem';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-todo-item',
  templateUrl: './update-todo-item.component.html',
  styleUrls: ['./update-todo-item.component.scss']
})
export class UpdateTodoItemComponent implements OnInit {
  id: string = "";
  toDoItem: ToDoItem = new ToDoItem(1,"","",false);

  constructor(public todoService: TodoService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void { 
    this.id = this.activateRoute.snapshot.paramMap.get("id")??"";
    this.toDoItem = this.todoService.findById(Number(this.id));
  }

  update(): void {
    this.todoService.update(this.toDoItem);
    
  }
}
