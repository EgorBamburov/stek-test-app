import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ToDoPageService} from "../services/to-do-page/to-do-page.service";
import {ModalController} from "@ionic/angular";
import {AddModalComponent} from "./components/add-modal/add-modal.component";
import {ToDoStateService} from "../services/state/to-do-state.service";

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.page.html',
  styleUrls: ['./to-do.page.scss'],
  providers: [ToDoPageService]
})
export class ToDoPage implements OnInit {
  public stateService = inject(ToDoStateService);
  public toDoPageService = inject(ToDoPageService);

  private destroyRef = inject(DestroyRef);
  private modalController = inject(ModalController)

  constructor() {}

  ngOnInit(): void {
    this.toDoPageService.getTodoList(this.destroyRef)
  }

  public async openModal(): Promise<void> {
    const addModal = await this.modalController.create({
      component: AddModalComponent
    })

    addModal.present()
  }

  public onDelete(id: number): void {
    this.toDoPageService.deleteTodo(this.destroyRef, id)
  }

  public handleRefresh(event: any): void {
    this.toDoPageService.getTodoList(this.destroyRef, event)
  }
}
