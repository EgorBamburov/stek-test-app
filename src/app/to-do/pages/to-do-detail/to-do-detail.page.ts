import {Component, DestroyRef, effect, inject, Injector, OnInit, signal} from '@angular/core';
import {ToDoDetailPageService} from "../../../services/to-do-detail-page/to-do-detail-page.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {enableOrDisableFormHelper} from "../../../helpers/enableOrDisableForm.helper";
import {ToDoPageService} from "../../../services/to-do-page/to-do-page.service";

@Component({
  selector: 'app-to-do-detail',
  templateUrl: './to-do-detail.page.html',
  styleUrls: ['./to-do-detail.page.scss'],
  providers: [ToDoDetailPageService, ToDoPageService]
})
export class ToDoDetailPage implements OnInit {
  public form!: FormGroup;
  public isEdit$ = signal<boolean>(false)

  private toDoDetailPageService = inject(ToDoDetailPageService)
  private id$ = signal<string>('')

  constructor(
    private route: ActivatedRoute,
    private destroyRef: DestroyRef,
    private injector: Injector,
    ) { }

  ngOnInit() {
    this.initForm()
    this.getCurrentIdFromLink()
    this.getCurrentTodo()
    this.subScribeOnCurrentToDo()
    this.subOnSuccessUpdate()
  }

  public onCancel(): void {
    this.isEdit$.set(false)
  }

  public onEdit(): void {
    if (this.isEdit$()) {
      this.toDoDetailPageService.updateToDo(this.destroyRef, this.form.value.title, this.form.value.completed)
    } else {
      this.isEdit$.set(true)
      enableOrDisableFormHelper(this.form, true)
    }
  }

  private getCurrentIdFromLink(): void {
    const id = this.route.snapshot.params['id'];
    this.id$.set(id)
  }

  private getCurrentTodo(): void {
    this.toDoDetailPageService.getCurrentTodo(this.id$(), this.destroyRef)
  }

  private initForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      completed: new FormControl(false),
    })

    enableOrDisableFormHelper(this.form, false)
  }

  private subScribeOnCurrentToDo(): void {
    effect(() => {
      if (this.toDoDetailPageService.currentToDo$()) {
        this.patchFormValue()
      }
    }, {injector: this.injector});
  }

  private patchFormValue(): void {
    const toDoData = this.toDoDetailPageService.currentToDo$()

    this.form.patchValue({
      title: toDoData?.title,
      completed: toDoData?.completed
    })
  }

  private subOnSuccessUpdate(): void {
    effect(() => {
      if (this.toDoDetailPageService.isSuccessUpdate$()) {
        this.isEdit$.set(false);
        enableOrDisableFormHelper(this.form, false);
        this.toDoDetailPageService.isSuccessUpdate$.set(false);
      }
    }, { injector: this.injector, allowSignalWrites: true });
  }
}
