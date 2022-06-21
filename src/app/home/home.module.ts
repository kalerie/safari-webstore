import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './containers/main/main.component';
import { CardItemComponent } from './components/card-item/card-item.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../common/shared.module';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ClothesComponent } from './containers/clothes/clothes.component';
import { ShoesComponent } from './containers/shoes/shoes.component';
import { AccessoriesComponent } from './containers/accessories/accessories.component';
import { ReactiveFormsModule } from '@angular/forms';

const homeRouter = [
  {path: '', component: MainComponent},
  {
    path: 'clothes',
    component: ClothesComponent,
    // data: {type: 'update'},
  },
  {
    path: 'shoes',
    component: ShoesComponent,
    // data: {type: 'update'},
  },
  {
    path: 'accessories',
    component: AccessoriesComponent,
    // data: {type: 'update'},
  },
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'cart'
  // }


]

@NgModule({
  declarations: [
    MainComponent,
    CardItemComponent,
    PaginationComponent,
    ClothesComponent,
    ShoesComponent,
    AccessoriesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(homeRouter),
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
