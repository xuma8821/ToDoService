import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  private baseApi= "https://localhost:44309/ToDos";
  constructor(private http: HttpClient) { }
  create(toDoItem: ToDoItem): Observable<void>{
    return this.http.post<void>(this.baseApi,toDoItem);
  }
  // public todoItems(): Observable<ToDoItem[]> {
  //   return this.http.get<ToDoItem[]>(this.baseApi);
  // }
  delete(id:number): Observable<void>{
    return this.http.delete<void>(`${this.baseApi}?${id}`);

  }
  findById(id:number):Observable<ToDoItem>{
    return this.http.get<ToDoItem>(`${this.baseApi}/${id}`);
  }
}
