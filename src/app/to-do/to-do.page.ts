import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {ToDoPageService} from "../services/to-do-page/to-do-page.service";
import {single} from "rxjs";
import {IToDoElement} from "../interfaces/to-do-page/to-do-element.interface";
import {ModalController} from "@ionic/angular";
import {AddModalComponent} from "./components/add-modal/add-modal.component";
import {ToDoApiService} from "../services/api/to-do/to-do-api.service";

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.page.html',
  styleUrls: ['./to-do.page.scss']
})
export class ToDoPage implements OnInit {
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
