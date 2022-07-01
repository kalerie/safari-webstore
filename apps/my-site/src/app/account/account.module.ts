import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './containers/account/account.component';
import { FavoritesComponent } from './containers/favorites/favorites.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const accountRouter: Routes = [
  {
    path: '',
    component: AccountComponent, 
    children: [
      {
        path: 'profile',
        data: {type: 'profile'},
        component: ProfileComponent
      },
      {
        path: 'favorites',
        data: {type: 'favorites'},
        component: FavoritesComponent,
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  declarations: [
    AccountComponent,
    FavoritesComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(accountRouter),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
