import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {IToDoElement} from "../interfaces/to-do-page/to-do-element.interface";
import {HttpClient} from "@angular/common/http";
import {map, take} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class ToDoPageService {
  private http = inject(HttpClient)

  constructor() {}

  public toDoList$ = signal<IToDoElement[]>([])

  public getTodoList(destroy: DestroyRef): void {
    this.http.get('https://jsonplaceholder.typicode.com/todos')
      .pipe(takeUntilDestroyed(destroy))
      .subscribe({
      next: (res) => this.toDoList$.set(res as IToDoElement[])
    })
  }

  public addToDo(destroy: DestroyRef): void {
    const id = (this.toDoList$().length + 1)
    const title = `test ${id}`
    const userId = 1
    const completed = false

    const toDoItem: IToDoElement = {
      id,
      title,
      userId,
      completed
    }

    this.http.post('https://jsonplaceholder.typicode.com/todos', toDoItem)
      .pipe(takeUntilDestroyed(destroy))
      .subscribe({
      next: (res) => this.toDoList$().push(res as IToDoElement)
    })
  }
}
