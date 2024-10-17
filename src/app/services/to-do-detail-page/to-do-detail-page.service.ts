import {DestroyRef, inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IToDoElement} from "../../interfaces/to-do-page/to-do-element.interface";
import {AlertService} from "../alert/alert.service";
import {LoadingService} from "../loading/loading.service";
import {finalize, take} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Router} from "@angular/router";

@Injectable()
export class ToDoDetailPageService {
  public currentToDo$ = signal<IToDoElement | null>(null)
  public isError$ = signal<boolean>(false)

  private alertService = inject(AlertService);
  private loadingService = inject(LoadingService);
  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

  public getCurrentTodo(id: string, destroyRef: DestroyRef): void {
    this.loadingService.isLoading(true);
    this.http.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
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
}
