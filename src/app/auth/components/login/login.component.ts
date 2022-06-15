import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../common/interfaces/user.interface';
import { UserService } from '../../user.service';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  authFailed: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      rememberMyDetails: new FormControl(),
    })
  }

  submit() {
    const userCredentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    
    this.userService.login(userCredentials).subscribe((bol) => {
      if(bol){
        this.router.navigate(['/']);
      } else {
        this.authFailed = true;
      }
      
    });
    // this.userService.addUser(user).subscribe(() => {
    //   this.router.navigate(['/auth/login']);
    // });
    // this.registrationForm.reset();
  }
}
