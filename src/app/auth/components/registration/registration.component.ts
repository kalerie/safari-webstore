import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../common/interfaces/user.interface';
import { UserService } from '../../user.service';

@Component({
  selector: 'auth-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
      
    }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', [ 
          Validators.minLength(3), Validators.required ]),
      lastName: new FormControl('', [ 
        Validators.minLength(3), Validators.required ]),
      email: new FormControl('', Validators.email),
      createPassword: new FormControl(),
      confirmPassword: new FormControl(),
      newsletters: new FormControl()
    })

  }


  submit() {
    const user: User = {
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.confirmPassword,
      newsletters: this.registrationForm.value.newsletters
    };
    
    this.userService.addUser(user).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

}
