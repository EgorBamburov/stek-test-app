import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {IToDoElement} from "../../../interfaces/to-do-page/to-do-element.interface";
import {RouterModule} from "@angular/router";

@Component({
    selector: 'app-to-do-item',
    templateUrl: './to-do-item.component.html',
    styleUrls: ['./to-do-item.component.scss'],
    standalone: true,
    imports: [
      IonicModule,
      RouterModule
    ]
})
export class ToDoItemComponent {
  @Input() toDoItem!: IToDoElement
  @Output() delete = new EventEmitter<number>()
  constructor() {}

  public onDelete(id: number): void {
    this.delete.emit(id)
  }

}
