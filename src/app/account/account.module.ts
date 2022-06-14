import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './containers/favorites/favorites.component';
import { AccountComponent } from './containers/account/account.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const accountRouter = [
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
