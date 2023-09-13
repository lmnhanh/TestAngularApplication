import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AuthenticatedUser } from 'app/core/models/AuthenticatedUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmiting: boolean = false
  user: AuthenticatedUser | null = null;

  constructor(private _authService: AuthService, private _router: Router) {
    this.loginForm = new FormBuilder().group({
      username: ["", [Validators.required, Validators.maxLength(50)]],
      password: ["", [Validators.required, Validators.maxLength(50)]],
    });

    this._authService.getAuthenticatedUserObservable().subscribe((user) => {
      this.user = user;
    })

  }

  login() {
    this.isSubmiting = true;
    this._authService.logIn(
      {
        "username": this.form["username"].value,
        "password": this.form["password"].value
      },
      () => {
        this.isSubmiting = false;
        this._router.navigate(["/"]);
      }
    );
  }

  get form() {
    return this.loginForm.controls;
  }
}
