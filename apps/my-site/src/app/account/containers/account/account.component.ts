import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../auth/user.service';
import { NotificationService } from '../../../common/services/notification.service';

@Component({
  selector: 'safari-store-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  signout() {
    this.notifyService.showSuccess('Signed out');
    this.userService.signout();
    this.router.navigate(['/auth']);
  }

}
