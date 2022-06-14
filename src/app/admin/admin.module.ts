import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { AdminComponent } from './containers/admin/admin.component';
import { ColorsTableComponent } from './components/colors-table/colors-table.component';
import { SizesTableComponent } from './components/sizes-table/sizes-table.component';
import { SizeFormComponent } from './components/size-form/size-form.component';
import { ColorFormComponent } from './components/color-form/color-form.component';
import { ProductsComponent } from './containers/products/products.component';
import { ColorsComponent } from './containers/colors/colors.component';
import { SizesComponent } from './containers/sizes/sizes.component';

const adminRouter = [
  {
    path: '',
    component: AdminComponent, 
    children: [
      {
        path: 'products',
        data: {type: 'products'},
        component: ProductsComponent,
        children: [
          {
            path: 'new',
            data: {type: 'create'},
            component: ProductFormComponent
          },
          {
            path: ':id',
            component: ProductFormComponent,
            data: {type: 'update'},
          }
        ]
      },
      {
        path: 'sizes',
        data: {type: 'sizes'},
        component: SizesComponent,
        children: [
          {
            path: 'new',
            data: {type: 'create'},
            component: SizeFormComponent
          },
          {
            path: ':id',
            component: SizeFormComponent,
            data: {type: 'update'},
          }
        ]
      },
      {
        path: 'colors',
        data: {type: 'colors'},
        component: ColorsComponent,
        children: [
          {
            path: 'new',
            data: {type: 'create'},
            component: ColorFormComponent
          },
          {
            path: ':id',
            component: ColorFormComponent,
            data: {type: 'update'},
          }
        ]
      },

      // {
      //   path: 'new',
      //   data: {type: 'create'},
      //   component: ProductFormComponent
      // },
      // {
      //   path: ':id',
      //   component: ProductFormComponent,
      //   data: {type: 'update'},
      // }
    ]
  }
]

@NgModule({
  declarations: [
    ProductFormComponent,
    ProductsTableComponent,
    AdminComponent,
    ColorsTableComponent,
    SizesTableComponent,
    SizeFormComponent,
    ColorFormComponent,
    ProductsComponent,
    ColorsComponent,
    SizesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRouter),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
