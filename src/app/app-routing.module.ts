import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FactoryManagerComponent } from "./factory-manager/factory-manager.component"

const routes: Routes = [
  { path: 'factory', component: FactoryManagerComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
