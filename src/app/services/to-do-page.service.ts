import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {IToDoElement} from "../interfaces/to-do-page/to-do-element.interface";
import {HttpClient} from "@angular/common/http";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AlertService} from "./alert/alert.service";
import {LoadingService} from "./loading/loading.service";
import {finalize, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToDoPageService {
  private http = inject(HttpClient);
  private alertService = inject(AlertService);
  private loadingService = inject(LoadingService);

  constructor() {}

  public toDoList$ = signal<IToDoElement[]>([])
  public isCloseModal$ = signal<boolean>(false)

  public getTodoList(destroy: DestroyRef): void {
    this.loadingService.isLoading(true);

    this.http.get('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        take(1),
        takeUntilDestroyed(destroy),
        finalize(() => this.loadingService.isLoading(false))
      )
      .subscribe({
      next: (res) => this.toDoList$.set(res as IToDoElement[]),
      error: () => this.alertService.showErrorAlert('Не удалось загрузить списко ToDo')
    })
  }

  public addToDo(destroy: DestroyRef, title: string, completed: boolean): void {
    const id = (this.toDoList$().length + 1)
    const userId = 1

    const toDoItem: IToDoElement = {
      id,
      title,
      userId,
      completed
    }

    this.loadingService.isLoading(true);

    this.http.post('https://jsonplaceholder.typicode.com/todos', toDoItem)
      .pipe(
        take(1),
        takeUntilDestroyed(destroy),
        finalize(() => this.loadingService.isLoading(false))
      )
      .subscribe({
      next: (res) => {
        this.toDoList$().push(res as IToDoElement)
        this.setCloseModal(true)
      },
      error: () => {
        this.alertService.showErrorAlert('Не удалось создать ToDo')
      }
    });
  }

  public setCloseModal(isClose: boolean): void {
    this.isCloseModal$.set(isClose)
  }

  public updateToDoLocal(toDo: IToDoElement): void {
    this.toDoList$().find((element) => {
      if (element.id === toDo.id) {
        element.title = toDo.title
        element.completed = toDo.completed
      }
    })
  }

  public deleteTodo(destroyRef: DestroyRef, id: number): void {
    this.loadingService.isLoading(true);

    this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .pipe(
        take(1),
        takeUntilDestroyed(destroyRef),
        finalize(() => this.loadingService.isLoading(false))
      )
      .subscribe({
        next: () => {
          const index = this.toDoList$().findIndex((elem) => elem.id === id)

          this.toDoList$().splice(index , 1)
        },
        error: () => this.alertService.showErrorAlert('Не удалось удалить To Do')
      })
  }
}
