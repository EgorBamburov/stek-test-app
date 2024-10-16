import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {ToDoPageService} from "../services/to-do-page.service";
import {single} from "rxjs";
import {IToDoElement} from "../interfaces/to-do-page/to-do-element.interface";

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.page.html',
  styleUrls: ['./to-do.page.scss'],
})
export class ToDoPage implements OnInit {
  public toDoPageService = inject(ToDoPageService)

  constructor(private destroy: DestroyRef) {}

  ngOnInit(): void {
    this.toDoPageService.getTodoList(this.destroy)
  }

  public addToDo(): void {
    this.toDoPageService.addToDo(this.destroy)
  }

}
