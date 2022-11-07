import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ToDoItem } from '../model/ToDoItem';
import { TodoStoreService } from './todo-store.service';
import { TodoService } from './todo.service';

describe('TodoService', () => {

  let service: TodoService;
  let todoStoreService: TodoStoreService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post','delete','get']);
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

  it('should find todoItem with id', () => {
    // given
    const todoItem = new ToDoItem(8,'title','decription', true);
    httpClientSpy.get.and.returnValue(of(todoItem));

    // when
    const targetItem = service.findById(8);

    //then
    expect(httpClientSpy.get).toHaveBeenCalledWith(
      "https://localhost:44309/ToDos/8");
    targetItem.subscribe((res)=>{expect(res.id).toBe(8)});
    
  });

  it('should throw err message when failed to find todoItem with id', () => {
    // given
    httpClientSpy.get.and.returnValue(throwError(()=>({errorMessage:"Not found"})));

    // when
    const targetItem = service.findById(1);

    //then
    targetItem.subscribe(() => {},(throwError)=>{expect(service.errorMessage).toEqual("Not found");});
    
  });
  it('should find todoItems', () => {
    // given
    const todoItems = [new ToDoItem(8,'title','decription', true)];
    httpClientSpy.get.and.returnValue(of(todoItems));

    // when
    const targetItems = service.findAllItems();

    //then;
    targetItems.subscribe((res)=>{expect(res.length).toBe(1)});    
  });
});
