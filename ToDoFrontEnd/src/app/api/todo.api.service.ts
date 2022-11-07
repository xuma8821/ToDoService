import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  private baseApi='https://localhost:44309/ToDos/';
  constructor(private http: HttpClient) { }
  public todoItems(): Observable<ToDoItem[]> {
    return this.http.get<ToDoItem[]>(this.baseApi);
  }
}
