import {DestroyRef, inject, Injectable, signal} from "@angular/core";
import {IToDoElement} from "../../interfaces/to-do-page/to-do-element.interface";
import {AlertService} from "../alert/alert.service";
import {LoadingService} from "../loading/loading.service";
import {finalize, take} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Router} from "@angular/router";
import {ToDoPageService} from "../to-do-page/to-do-page.service";
import {ToDoApiService} from "../api/to-do/to-do-api.service";

@Injectable()
export class ToDoDetailPageService {
  public currentToDo$ = signal<IToDoElement | null>(null);
  public isError$ = signal<boolean>(false);
  public isSuccessUpdate$ = signal<boolean>(false);

  private alertService = inject(AlertService);
  private loadingService = inject(LoadingService);
  private toDoPageService = inject(ToDoPageService);
  private apiService = inject(ToDoApiService)
  private router = inject(Router)
  constructor() {}

  public getCurrentTodo(id: string, destroyRef: DestroyRef): void {
    this.loadingService.isLoading(true);
    this.apiService.get(id)
      .pipe(
        take(1),
        takeUntilDestroyed(destroyRef),
        finalize(() => this.loadingService.isLoading(false))
        )
      .subscribe({
      next: (res) => this.currentToDo$.set(res as IToDoElement),
      error: () => {
        this.alertService.showErrorAlert('Не удалось загрузть ToDo')
        this.router.navigate(['/to-do'])
        this.isError$.set(true)
      }
    })
  }

  public updateToDo(destroyRef: DestroyRef, title: string, completed: boolean): void {
      const toDo = {
        id: this.currentToDo$()?.id,
        userId: this.currentToDo$()?.userId,
        title,
        completed
      }

      this.loadingService.isLoading(true)

      this.apiService.patch(toDo as IToDoElement, this.currentToDo$()?.id as number)
        .pipe(
          take(1),
          takeUntilDestroyed(destroyRef),
          finalize(() => this.loadingService.isLoading(false))
        )
        .subscribe({
          next: (res) => {
            this.toDoPageService.updateToDoLocal(res as IToDoElement)
            this.isSuccessUpdate$.set(true)
          },
          error: () => this.alertService.showErrorAlert('Не удалось изменить To Do')
        })
  }
}
