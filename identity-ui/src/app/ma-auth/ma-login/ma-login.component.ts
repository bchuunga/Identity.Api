import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private fb: FormBuilder
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

    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe(
      (result) => {
        this.user = result;
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
