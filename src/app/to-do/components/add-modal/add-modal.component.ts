import {Component, DestroyRef, effect, inject, Injector, OnInit, ViewChild} from '@angular/core';
import {IonicModule, IonModal, ModalController} from "@ionic/angular";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ToDoPageService} from "../../../services/to-do-page.service";

@Component({
    selector: 'app-add-modal',
    templateUrl: './add-modal.component.html',
    styleUrls: ['./add-modal.component.scss'],
    standalone: true,
    imports: [
        IonicModule,
        ReactiveFormsModule
    ]
})
export class AddModalComponent  implements OnInit {
  public form!: FormGroup;
  private toDoPageService = inject(ToDoPageService)
  constructor(private destroy: DestroyRef, private modalController: ModalController, private injector: Injector) {}

  ngOnInit():void {
    this.initForm()
    this.subOnCloseModal()
  }

  public close(): Promise<boolean> {
    return this.modalController.dismiss(null, 'cancel');
  }

  public save(): void {
    this.toDoPageService.addToDo(this.destroy, this.form.value.title, this.form.value.completed)
  }

  private initForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      completed: new FormControl(false, [Validators.required]),
    })
  }

  private subOnCloseModal(): void {
    effect(() => {
      if (this.toDoPageService.isCloseModal$()) {
        this.modalController.dismiss(null, 'confirm')
        this.toDoPageService.setCloseModal(false)
      }
    }, {injector: this.injector , allowSignalWrites: true});
  }
}
