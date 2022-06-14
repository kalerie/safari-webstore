import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isLoading: boolean = true;
  userProfileForm!: FormGroup;

  constructor(public route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.userProfileForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      gender: new FormControl(),
      dateOfBirth: new FormControl(),
      newsletters: new FormControl()
    })

    this.getProfileInfoAndPatchForm();
  }

  genders: Gender[] = [
    {
      value: 'male', label: "Male"
    },
    {
      value: 'female', label: "Female"
    },
    {
      value: 'NA', label: "Prefer not to tell"
    },
  ]

  submit() {
    this.isLoading = true;
    this.accountService.updateProfile(this.userProfileForm.value).subscribe(() => {
      this.getProfileInfoAndPatchForm();
    });
  }

  getProfileInfoAndPatchForm() {

    this.accountService.getProfile().subscribe((profile) => {
      this.userProfileForm.patchValue({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        gender: profile?.gender,
        dateOfBirth: profile?.dateOfBirth,
        newsletters: profile.newsletters
      })
      this.isLoading = false;
    });
  }

  


}

export interface Gender {
  value: string,
  label: string
}