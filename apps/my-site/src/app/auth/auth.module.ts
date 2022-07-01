import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './conteiners/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const authRouter: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        data: {type: 'login'},
        component: LoginComponent
      },
      {
        path: 'registration',
        data: {type: 'registration'},
        component: RegistrationComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authRouter),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
