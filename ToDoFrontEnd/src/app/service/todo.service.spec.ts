import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';
import { TodoService } from './todo.service';

describe('TodoService', () => {

  let service: TodoService;
  let todoStoreService: TodoStoreService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post','delete']);
    todoStoreService = new TodoStoreService();
    TestBed.configureTestingModule({
      providers:[
        TodoService,
        {provide:HttpClient,useValue: httpClientSpy}]
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create todoItem via mockHttp post', () => {
    // given
    const todoItem = new ToDoItem(8,'title','decription', true);
    httpClientSpy.post.and.returnValue(of({}))

    // when
    service.create(todoItem);

    //then
    expect(httpClientSpy.post).toHaveBeenCalledWith(
      "https://localhost:44309/ToDos", todoItem)
    
  });
  it('should response err when create fail', () => {
    // given
    const todoItem = new ToDoItem(8,'title','decription', true);
    httpClientSpy.post.and.returnValue(throwError(()=>({errorMessage:"Created failed"})));

    // when
    service.create(todoItem);

    //then
    expect(service.errorMessage).toEqual("Created failed");
    
  });

  it('should delete toDoItem', () => {
    // given
    httpClientSpy.delete.and.returnValue(of({}));

    // when
    service.delete(1);

    //then
    expect(httpClientSpy.delete).toHaveBeenCalledWith(
      "https://localhost:44309/ToDos?1")
    
  });

  it('should throw err msg when delete toDoItem fail', () => {
    // given
    httpClientSpy.delete.and.returnValue(throwError(()=>({errorMessage:"Delete failed"})));

    // when
    service.delete(1);

    //then
    expect(service.errorMessage).toEqual("Delete failed");
    
  });
});
