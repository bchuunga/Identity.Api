import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { UserDto } from '../../shared/api';
import { Store } from '@ngrx/store';
import authActions from '../^state/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'identity-ui-ma-login',
  templateUrl: './ma-login.component.html',
  styleUrls: ['./ma-login.component.scss'],
})
export class MaLoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  user: any;
  error: any;

  constructor(
    private readonly authService: AuthService,
    private fb: FormBuilder,
    private readonly store: Store,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.error = 'You need username and password';
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      (user) => {
        this.store.dispatch(authActions.login({ user }));
        this.router.navigateByUrl('/welcome');
      },
      (error) => {
        this.error = error.error;
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.error = null;
    this.loginForm.reset();
  }
}
