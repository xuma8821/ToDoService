import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TodoApiService } from '../api/todo.api.service';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  
  private _selectedTodoItem: ToDoItem = {} as ToDoItem;
  private _updatingTodoItem: ToDoItem = {} as ToDoItem;
  errorMessage?: string;
  constructor(private todoStore: TodoStoreService, private todoApi: TodoApiService) {
  }

  public findAllItems(): Observable<ToDoItem[]> {
    return this.todoApi.getAll().pipe(
      catchError((err) => {
        this.errorMessage = err.errorMessage;
        return throwError(() => err);
      })
    );;
  }

  findById(id: number):Observable<ToDoItem>{
    return this.todoApi.findById(id).pipe(
      catchError((err) => {
        this.errorMessage = err.errorMessage;
        return throwError(() => err);
      })
    );
  }

  public create(todoItem: ToDoItem): void {
    this.todoApi.create(todoItem).subscribe({
      next: response => { },
      error: error => {
        this.errorMessage = error.errorMessage
      }
    })
  }
  public delete(id: number): void {
    this.todoApi.delete(id).subscribe({
      next: response => { },
      error: error => {
        this.errorMessage = error.errorMessage
      }
    });
  }
  public update(updateTodoItem: ToDoItem): void {
    this.todoApi.update(updateTodoItem).subscribe({
      next: response => { },
      error: error => {
        this.errorMessage = error.errorMessage
      }
    });
  }

  

  public selectTodoItem(id: number): void {
    this._selectedTodoItem = this.todoStore.findById(id);
  }

  public selectTodoItemForUpdate(id: number): void {
    this._updatingTodoItem = Object.assign({}, this.todoStore.findById(id));
  }

  public currentTodoItem(): ToDoItem {
    return this._selectedTodoItem;
  }

  public currentUpdatingTodoItem(): ToDoItem {
    return this._updatingTodoItem;
  }
}
