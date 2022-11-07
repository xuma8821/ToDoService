import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo.service';
import { ToDoItem } from '../../model/ToDoItem';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todoitem-detail',
  templateUrl: './todoitem-detail.component.html',
  styleUrls: ['./todoitem-detail.component.scss']
})
export class TodoitemDetailComponent implements OnInit {
  id: string = "";
  toDoItem: ToDoItem = new ToDoItem(1,"","",false);

  constructor(public todoService: TodoService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.paramMap.get("id")??"";
    this.todoService.findById(Number(this.id)).subscribe((res)=>{this.toDoItem = res});
  }
}
