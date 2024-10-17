import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToDoPageRoutingModule } from './to-do-routing.module';

import { ToDoPage } from './to-do.page';
import {AddModalComponent} from "./components/add-modal/add-modal.component";
import {ToDoItemComponent} from "./components/to-do-item/to-do-item.component";
import {ToDoApiService} from "../services/api/to-do/to-do-api.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToDoPageRoutingModule,
    AddModalComponent,
    ToDoItemComponent
  ],
  declarations: [ToDoPage],
})
export class ToDoPageModule {}
