import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToDoDetailPage } from './to-do-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ToDoDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToDoDetailPageRoutingModule {}
