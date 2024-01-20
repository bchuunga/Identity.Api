import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'identity-ui-ma-register',
  templateUrl: './ma-register.component.html',
  styleUrls: ['./ma-register.component.scss'],
})
export class MaRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  user: any;
  errorMessages = [];

  constructor(
    private readonly authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessages = [];

    // if (this.registerForm.invalid) {
    //   return;
    // }

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (err: any) => {
        console.log(err.error.errors);
        if (err.error.errors) {
          this.errorMessages = err.error.errors;
        } else {
          // @ts-ignore
          this.errorMessages.push(err.error);
        }
      },
    });
  }

  onReset() {
    this.submitted = false;
    this.errorMessages = [];
    this.registerForm.reset();
  }
}
