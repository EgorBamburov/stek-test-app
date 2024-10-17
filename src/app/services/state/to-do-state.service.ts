import {Injectable, signal} from "@angular/core";
import {IToDoElement} from "../../interfaces/to-do-page/to-do-element.interface";

@Injectable({
  providedIn: 'root'
})
export class ToDoStateService {
  public toDoList$ = signal<IToDoElement[]>([]);
  constructor() {}

  public setToDoList(list: IToDoElement[]): void {
    this.toDoList$.set(list);
  }

  public addNewToDo(toDo: IToDoElement): void {
    this.toDoList$().push(toDo)
  }
}
