import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {finalize, take} from "rxjs";
import {AlertService} from "../alert/alert.service";
import {LoadingService} from "../loading/loading.service";
import {IToDoElement} from "../../interfaces/to-do-page/to-do-element.interface";
import {ToDoApiService} from "../api/to-do/to-do-api.service";
import {ToDoStateService} from "../state/to-do-state.service";

@Injectable()
export class ToDoPageService {
  private alertService = inject(AlertService);
  private loadingService = inject(LoadingService);
  private apiService = inject(ToDoApiService);
  private stateService = inject(ToDoStateService);

  constructor() {}

  public isCloseModal$ = signal<boolean>(false)
  public isLoading$ = signal<boolean>(false)

  public getTodoList(destroy: DestroyRef, event?: any): void {
    if (!event) this.loadingService.isLoading(true);

    this.isLoading$.set(true)

    this.apiService.get()
      .pipe(
        take(1),
        takeUntilDestroyed(destroy),
        finalize(() => {
          if (!event) this.loadingService.isLoading(false)
          if (event) event.target.complete()
          this.isLoading$.set(false)
        })
      )
      .subscribe({
      next: (res) => {
        this.stateService.setToDoList(res as IToDoElement[])
        if (event) event.target.complete()
      },
      error: () => this.alertService.showErrorAlert('Не удалось загрузить списко ToDo')
    })
  }

  public addToDo(destroy: DestroyRef, title: string, completed: boolean): void {
    const id = (this.stateService.toDoList$().length + 1)
    const userId = 1

    const toDoItem: IToDoElement = {
      id,
      title,
      userId,
      completed
    }

    this.loadingService.isLoading(true);
    this.isLoading$.set(true)

    this.apiService.post(toDoItem)
      .pipe(
        take(1),
        takeUntilDestroyed(destroy),
        finalize(() => {
          this.loadingService.isLoading(false)
          this.isLoading$.set(false)
        })
      )
      .subscribe({
      next: (res) => {
        this.stateService.toDoList$().push(res as IToDoElement)
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
    this.stateService.toDoList$().find((element) => {
      if (element.id === toDo.id) {
        element.title = toDo.title
        element.completed = toDo.completed
      }
    })
  }

  public deleteTodo(destroyRef: DestroyRef, id: number): void {
    this.loadingService.isLoading(true);

    this.apiService.delete(id)
      .pipe(
        take(1),
        takeUntilDestroyed(destroyRef),
        finalize(() => this.loadingService.isLoading(false))
      )
      .subscribe({
        next: () => {
          const index = this.stateService.toDoList$().findIndex((elem) => elem.id === id)

          this.stateService.toDoList$().splice(index , 1)
        },
        error: () => this.alertService.showErrorAlert('Не удалось удалить To Do')
      })
  }
}
