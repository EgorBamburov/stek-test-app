import {Component, inject, OnInit, signal} from '@angular/core';
import {ToDoPageService} from "../services/to-do-page.service";
import {single} from "rxjs";
import {IToDoElement} from "../interfaces/to-do-page/to-do-element.interface";

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.page.html',
  styleUrls: ['./to-do.page.scss'],
})
export class ToDoPage implements OnInit {
  public toDoList$ = signal<IToDoElement[]>([])

  private toDoPageService = inject(ToDoPageService)

  constructor() {}

  ngOnInit(): void {
    this.toDoList$.set(this.toDoPageService.getTodoList())
  }

  public addToDo(): void {
    this.toDoPageService.addToDo()
  }

}
