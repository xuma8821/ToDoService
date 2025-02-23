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
    return this.http.post<void>(this.baseApi, toDoItem);
  }
  public getAll(): Observable<ToDoItem[]> {
    return this.http.get<ToDoItem[]>(this.baseApi);
  }
  delete(id:number): Observable<any>{
    // return this.http.delete<any>(`${this.baseApi}`,{params:{id}});
    return this.http.delete<any>(`${this.baseApi}?id=${id}`);

  }
  findById(id:number):Observable<ToDoItem>{
    return this.http.get<ToDoItem>(`${this.baseApi}/${id}`);
  }

  update(updateTodoItem:ToDoItem):Observable<void>{
    return this.http.put<void>(this.baseApi,updateTodoItem);
  }
}
