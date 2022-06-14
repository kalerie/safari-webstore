import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './containers/main/main.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../common/shared.module';
import { PaginationComponent } from './components/pagination/pagination.component';

const homeRouter = [
  {path: '', component: MainComponent}
]

@NgModule({
  declarations: [
    MainComponent,
    CardItemComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(homeRouter)
  ]
})
export class HomeModule { }
