import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { CreateUserDto } from '@safari-store/api-interfaces';
import { NotificationService } from '../../../common/services/notification.service';

@Component({
  selector: 'auth-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private notifyService: NotificationService,
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
    const user: CreateUserDto = {
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.confirmPassword,
      newsletters: this.registrationForm.value.newsletters
    };

    this.userService.register(user).subscribe({
      next : (regUser) => {
        if(regUser) {
          this.notifyService.showSuccess('Profile was register succsesfullly'); // check spell
          this.router.navigate(['/auth/login']);
        } else {
          this.notifyService.showWarning('Enable to create a profile, please try agane');  // check spell
        }
      }
    });
  }

}
