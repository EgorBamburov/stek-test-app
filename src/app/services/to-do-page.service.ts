import { Injectable } from '@angular/core';
import {IToDoElement} from "../interfaces/to-do-page/to-do-element.interface";

@Injectable({
  providedIn: 'root'
})
export class ToDoPageService {

  constructor() { }

  public toDoList: IToDoElement[] = [
    {
      id: '1',
      name: 'test 1',
    },
    {
      id: '2',
      name: 'test 2',
    },
    {
      id: '2',
      name: 'test 3',
    },
    {
      id: '3',
      name: 'test 4',
    }
  ]

  public getTodoList(): IToDoElement[] {
    return this.toDoList
  }

  public addToDo(): void {
    const id = (this.toDoList.length + 1).toString()
    const name = `test ${id}`

    this.toDoList.push({
      id,
      name
    })
  }
}
