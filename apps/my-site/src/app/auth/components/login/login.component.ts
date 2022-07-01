import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { NotificationService } from '../../../common/services/notification.service';

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
    private router: Router,
    private notifyService: NotificationService
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

    this.userService.login(userCredentials).subscribe((loginUser) => {
      if(loginUser){
        this.notifyService.showSuccess('You are logged in');
        this.userService.setUserIdToLocalStorage(loginUser.token);
        this.router.navigate(['/']);
      } else {
        this.notifyService.showSuccess('Enable to login, please try again'); //check spell
        this.authFailed = true;
      }
    });
  }
}
