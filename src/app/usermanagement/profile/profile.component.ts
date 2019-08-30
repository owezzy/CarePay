import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';
import {AuthenticationService} from '../../auth/authentication.service';
import {UserInterface} from '../user';
import {EmailValidation} from '../../shared';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  userError = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authService.authStatus.subscribe(
      authStatus => (this.authService.authStatus));

    this.userService.getCurrentUser().subscribe(user => {
      this.buildUserForm(user);
    })

    this.buildUserForm();
  }

  buildUserForm(user?: UserInterface) {
    this.userForm = this.formBuilder.group({
      email: [
        {
          value: (user && user.name) || '',
        },
        EmailValidation,
      ],

    })
  }
}
